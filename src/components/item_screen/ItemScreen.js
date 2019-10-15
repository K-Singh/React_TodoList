import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    constructor(props){
        super(props);
        this.desc = React.createRef();
        this.assigned = React.createRef();
        this.dueDate = React.createRef();
        this.completed = React.createRef();
    }
    autofillDesc(){
        if(this.props.todoItem.key !== -1){
            return this.props.todoItem.description;
        }
    }
    autofillAssigned(){
            if(this.props.todoItem.key !== -1){
                return this.props.todoItem.assigned_to;
            }
        }
    
    autofillDueDate(){
        if(this.props.todoItem.key !== -1){
            return this.props.todoItem.due_date;
        }
    }
    autofillCompleted(){
        if(this.props.todoItem.key !== -1){
            if(this.props.todoItem.completed === true){
               return true;
            }
            return false;
        }
    }
    update = (newList) => {this.props.loadList(newList);}
    reorderLists = (newList) => {(this.props.updateLists(newList));}
    reassignKeys = (listToUpdate) => {(this.props.updateKeys(listToUpdate));}
    cancel = (list) => {this.props.loadList(list)}
    onSubmit = e => {
        var newItem = new Object();
        newItem.description = this.desc.current.value;
        newItem.assigned_to = this.assigned.current.value;
        newItem.due_date = this.dueDate.current.value;
        newItem.completed = this.completed.current.checked;
        var newItems = this.props.todoList.items;
        var found = false;
        newItems = newItems.map(element => {
            if(element === this.props.todoItem){
                found = true;
                return newItem;
            }else
                return element;
        });
        if(!found){
            newItems.push(newItem);
        }
        var newList = Object.assign({}, this.props.todoList);
        this.reassignKeys(newItems);
        newList.items = newItems;
        this.update(newList);
        this.reorderLists(newList);
    }

    onCancel = e => {
        this.cancel(this.props.todoList)
    }
    render() {
        return (
            <div id="todo_item" >
            <div id="item_heading">Item</div>
            <form id="item_form_container">
                 <div id="item_description_prompt" className="item_prompt" >Description: </div>
                 <input type="text" name="Description" className="item_input" id="item_description_textfield" ref = {this.desc} defaultValue={this.autofillDesc()}/><br/>
                 
                 <div id="item_assigned_to_prompt" className="item_prompt">Assigned To: </div>
                 <input type="text" name="AssignedTo" className="item_input" id="item_assigned_to_textfield" ref = {this.assigned} defaultValue={this.autofillAssigned()}/><br/>
     
                 <div id="item_due_date_prompt" className="item_prompt">Due Date: </div>
                 <input type="date" name="Date" className="item_input" id="item_due_date_picker" ref = {this.dueDate} defaultValue={this.autofillDueDate()}/><br/>
     
                 <div id="item_completed_prompt" className="item_prompt">Completed: </div>
                 <input type="checkbox" name="Completed" className="item_input" id="item_completed_checkbox" ref = {this.completed} defaultChecked = {!!this.autofillCompleted()}/><br/>
     
                 <input type="button" name="Submit" className="item_input" id="item_form_submit_button" value="Submit" onClick={this.onSubmit}/>
                 <input type="button" name="Cancel" className="item_input" id="item_form_cancel_button" value="Cancel" onClick={this.onCancel}/><br/>
            </form>
     
         </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
