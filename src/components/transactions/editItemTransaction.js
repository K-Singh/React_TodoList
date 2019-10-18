export class editItemTransaction {

    constructor(listScreen, newItemsList){
       this.listScreen = listScreen;
      
       this.oldTodoList = this.listScreen.props.todoList;
        
      
       var newTodoList = Object.assign({}, this.listScreen.props.todoList);
       this.listScreen.reassignKeys(newItemsList);
       newTodoList.items = newItemsList;  

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
        return "editItem " + this.key;
    }
}
 
export default editItemTransaction