import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    constructor(props){
        super(props)
        this.name = React.createRef();
        this.owner = React.createRef();
    }


    state = {

    }
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    update = (newList) => {this.props.loadList(newList);}
    editItem = (item) => {this.props.loadItem(item);}
    reorderLists = (newList) => {(this.props.updateLists(newList));}
    renameLists = (newList, key) => {(this.props.changeLists(newList, key));}
    reassignKeys = (listToUpdate) => {(this.props.updateKeys(listToUpdate));}
    moveUp(key){
       var itemOne = this.props.todoList.items.find((e) => e.key == key-1);
       var itemTwo = this.props.todoList.items.find((e) => e.key == key);
       var newItems = this.props.todoList.items.map(element => {
           if(element.key == key){
               return itemOne;
           }else if(element.key == key - 1){
               return itemTwo;
           }
           return element;
       });
       var newTodoList = Object.assign({}, this.props.todoList);
       this.reassignKeys(newItems);
       newTodoList.items = newItems;     
       this.update(newTodoList);
       this.reorderLists(newTodoList);
   }
    
   moveDown(key){
       console.log("test");
    var itemOne = this.props.todoList.items.find((e) => e.key == key+1);
    var itemTwo = this.props.todoList.items.find((e) => e.key == key);
    var newItems = this.props.todoList.items.map(element => {
        if(element.key == key){
            return itemOne;
        }else if(element.key == key + 1){
            return itemTwo;
        }
        return element;
    });
    var newTodoList = Object.assign({}, this.props.todoList);
    this.reassignKeys(newItems);
    newTodoList.items = newItems;     
    this.update(newTodoList);
    this.reorderLists(newTodoList);
    }
    removeItem(key){
       
        var newItems = this.props.todoList.items.filter(element => {
            if(element.key != key){
                return true;
            }else
                return false;
        });
        var newTodoList = Object.assign({}, this.props.todoList);
        this.reassignKeys(newItems);
        newTodoList.items = newItems;     
        this.update(newTodoList);
        this.reorderLists(newTodoList);
        }
    addItem(){
        var item = new Object();
        item.key = "-1";
        
        this.editItem(item);
    }

    editItem(item){
        this.editItem(item);
    }

    updateName = e => {
    var newTodoList = Object.assign({}, this.props.todoList);
    
    newTodoList.name = this.name.current.value;  
    this.renameLists(newTodoList, this.props.todoList.key);
    this.update(newTodoList);
    }
   
    updateOwner = e => {
        var newTodoList = Object.assign({}, this.props.todoList);
        
        newTodoList.owner = this.owner.current.value;  
        this.renameLists(newTodoList, this.props.todoList.key);
        this.update(newTodoList);
        }
       
    render() {
        return (
            
            
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash modal={this.props.modal}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            ref = {this.name}
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            onKeyDown={this.updateName} />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            ref = {this.owner}
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield"
                            onKeyDown={this.updateOwner}
                            />
                        
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                loadList={this.props.loadList} 
                moveUp ={this.moveUp.bind(this)}
                moveDown={this.moveDown.bind(this)}
                removeItem={this.removeItem.bind(this)}
                addItem={this.addItem.bind(this)}
                editItem={this.editItem.bind(this)}/>
            </div>
           
        )
    }
}

export default ListScreen
