import React, { Component } from 'react'
import ListItemCardToolbar from './ListItemCardToolbar.js'
export class ListItemCard extends Component {
    getCompleted() {
        if(this.props.listItem.completed)
            return "Completed";
        else
            return "Pending";
   }
   getCompletedClass(){
    if(this.props.listItem.completed)
        return 'list_item_card_completed';
    else   
        return 'list_item_card_not_completed';
   }
  
  
    render() {
      
        return (
            <div className='list_item_card' onClick={() => this.props.editItem(this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={this.getCompletedClass()}>
                    {this.getCompleted()}
                </div>
                <ListItemCardToolbar 
                    listItem={this.props.listItem}
                    moveUp={this.props.moveUp}
                    moveDown={this.props.moveDown}
                    removeItem={this.props.removeItem}
                    todoList={this.props.todoList}
                />
            </div>
        )
    }
}

export default ListItemCard
