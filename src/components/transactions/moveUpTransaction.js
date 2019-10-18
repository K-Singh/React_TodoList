export class moveUpTransaction {

    constructor(listScreen, key){
       this.listScreen = listScreen;
       this.key = key
       this.oldTodoList = this.listScreen.props.todoList;

       var itemOne = this.listScreen.props.todoList.items.find((e) => e.key == this.key-1);
       var itemTwo = this.listScreen.props.todoList.items.find((e) => e.key == this.key);
       var newItems = this.listScreen.props.todoList.items.map(element => {
           if(element.key == this.key){
               return itemOne;
           }else if(element.key == this.key - 1){
               return itemTwo;
           }
           return element;
       });
       var newTodoList = Object.assign({}, this.listScreen.props.todoList);
       this.listScreen.reassignKeys(newItems);
       newTodoList.items = newItems;  

       this.newTodoList = newTodoList;
       
    }

   
    doTransaction() {
        this.listScreen.reassignKeys(this.newTodoList.items);
        this.listScreen.update(this.newTodoList);
        this.listScreen.reorderLists(this.newTodoList);
    }

   
    undoTransaction() {
        this.listScreen.reassignKeys(this.oldTodoList.items);
        this.listScreen.update(this.oldTodoList);
        this.listScreen.reorderLists(this.oldTodoList);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
   toString() {
        return "moveUp " + this.key;
    }
}
 
export default moveUpTransaction