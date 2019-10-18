export class changeOwnerTransaction {

    constructor(listScreen, ref){
       this.listScreen = listScreen;
       this.oldTodoList = this.listScreen.props.todoList;
       this.ref = ref;
       
       var newTodoList = Object.assign({}, this.listScreen.props.todoList);
      
       newTodoList.owner = this.ref.current.value;

       this.newTodoList = newTodoList;
       
    }

   
    doTransaction() {
        this.ref.current.value = this.newTodoList.owner;
        this.listScreen.renameLists(this.newTodoList, this.listScreen.props.todoList.key);
        this.listScreen.update(this.newTodoList);
    }

   
    undoTransaction() {
        this.ref.current.value = this.oldTodoList.owner;
        this.listScreen.renameLists(this.oldTodoList, this.listScreen.props.todoList.key);
        this.listScreen.update(this.oldTodoList);
        
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
   toString() {
        return "changeOwner " + this.ref;
    }
}
 
export default changeOwnerTransaction