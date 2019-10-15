import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  constructor(){
    super();
    this.modal = React.createRef();
  }
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    todoItem: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  loadItem = (item) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({todoItem: item});
  }


  updateLists = (newList) => {
      var newTodoLists = this.state.todoLists.map((list) => {
        if(list.name != newList.name){
          console.log(list);  
          return list;
        }

      });
      newTodoLists.unshift(newList);
      newTodoLists = newTodoLists.filter((element) => {
        if(element == undefined)
            return false;
        return true;
      })
      this.updateKeys.bind(this, newTodoLists);
      this.setState({todoLists: newTodoLists});
  }

  changeLists = (newList, key) => {
    var newTodoLists = this.state.todoLists.map((list) => {
      if(list.key != key){
        console.log(list);  
        return list;
      }

    });
    newTodoLists.unshift(newList);
    newTodoLists = newTodoLists.filter((element) => {
      if(element == undefined)
          return false;
      return true;
    })
    this.updateKeys.bind(this, newTodoLists);
    this.setState({todoLists: newTodoLists});
  }
  updateKeys = (listToUpdate) => {
    var id = 0;
    listToUpdate.forEach(element => {
     element.key = id;
     id++;
 })
  }
  createList = e => {
    var newTodoLists = this.state.todoLists.map(e => {
        return e;
    })
    var newTodoList = new Object();
    newTodoList.key = -1;
    newTodoList.name = "Untitled";
    newTodoList.owner = "No Owner";
    newTodoList.items = [];
    newTodoLists.unshift(newTodoList)
    this.updateKeys.bind(this, newTodoLists);
    this.setState({todoLists: newTodoLists});
    console.log("hello");
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: newTodoList});
  }
  deleteList = e => {
    var newTodoLists = Object.assign({}, this.state.todoLists);
    newTodoLists = this.state.todoLists.filter( element => {
      if(element === this.state.currentList)
        return false;
      else
        return true;
    })
    this.updateKeys.bind(this, newTodoLists);
    this.setState({todoLists: newTodoLists});
    console.log("hello");
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});

  }

  cancelDelete = e => {
    this.modal.current.className = "";
  }
  render() {
    

    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        createList={this.createList.bind(this)}/>;
      case AppScreen.LIST_SCREEN:            
        return(
          <div>
          <div id="yes_no_modal" className="" ref={this.modal} >
                <div className="yes_no_modal_text">Delete List?</div>
                <div className="yes_no_modal_text" id="yes_no_modal_title">Are you sure you want to delete this list?</div>
                <div id="yes_no_modal_button_grid">
                    <div className="yes_no_modal_button" id="yes_no_modal_confirm" onClick={this.deleteList}><br/>Yes<br/><br/></div>
                    <div className="yes_no_modal_button" id="yes_no_modal_cancel" onClick={this.cancelDelete}><br/>No<br/><br/></div>
                </div>
               
                <div className="yes_no_modal_text">The list will not be retrievable</div>
            </div> 

          <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          loadList={this.loadList.bind(this)}
          updateLists = {this.updateLists.bind(this)}
          updateKeys = {this.updateKeys.bind(this)}
          loadItem = {this.loadItem.bind(this)}
          changeLists = {this.changeLists.bind(this)}
          modal = {this.modal} />
          </div>
        );
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          currentScreen = {this.state.currentScreen}
          todoList = {this.state.currentList}
          todoItem = {this.state.todoItem}
          loadList = {this.loadList.bind(this)}
          updateKeys = {this.updateKeys.bind(this)}
          updateLists = {this.updateLists.bind(this)}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;