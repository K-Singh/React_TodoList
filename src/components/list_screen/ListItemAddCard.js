import React, { Component } from 'react'

export class ListItemAddCard extends Component {
   
    render() {
      
        return (
            <div className='list_item_add_card' onClick={() => this.props.addItem()}>
                <img src="/images/icons/AddItem.png"></img>
            </div>
        )
    }
}

export default ListItemAddCard
