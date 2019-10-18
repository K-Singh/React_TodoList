export class removeItemTransaction {

    constructor(listScreen, key){
       this.listScreen = listScreen;
       this.key = key
       this.oldTodoList = this.listScreen.props.todoList;

       var newItems = this.listScreen.props.todoList.items.filter(element => {
        if(element.key != key){
            return true;
        }else
            return false;
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
        return "removeItem " + this.key;
    }
}
 
export default removeItemTransaction