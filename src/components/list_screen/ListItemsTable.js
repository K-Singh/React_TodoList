import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import { ListItemAddCard } from './ListItemAddCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header">Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            todoList={this.props.todoList}
                            loadList={this.props.loadList}
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown}
                            removeItem={this.props.removeItem}
                            editItem={this.props.editItem} />
                    ))
                }
                <ListItemAddCard 
                    todoList={this.props.todoList}
                    addItem={this.props.addItem}
                    
                />
            </div>
        )
    }
}

export default ListItemsTable
