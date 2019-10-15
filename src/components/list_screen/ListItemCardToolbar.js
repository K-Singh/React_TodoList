import React, { Component } from 'react'

export class ListItemCardToolbar extends Component {
   
  editItem = e => {
      e.stopPropagation();
  }

  getDisabledUp(){
      if(this.props.listItem.key === 0){
          return 'list_item_card_button_disabled';
      }
      else
        return 'list_item_card_button';
      }
getDisabledDown(){
    var length = 0;
    var list = this.props.todoList.items.map(e => {
        length++;
        return e;
    })
    
     if(this.props.listItem.key === length -1){
        return 'list_item_card_button_disabled';
      }else
      return 'list_item_card_button';
}
  
    render(){
      
        return (
                <div className='list_item_card_toolbar' onClick={this.editItem}>
                    <div   id={'list_item_card_upButton'+this.props.listItem.key} className={this.getDisabledUp()} onClick={() => this.props.moveUp(this.props.listItem.key)}>
                        <img src="/images/icons/MoveUp.png"></img>
                    </div>
                    <div  id={'list_item_card_downButton'+this.props.listItem.key} className={this.getDisabledDown()} onClick={() => this.props.moveDown(this.props.listItem.key)}>
                    <img src="/images/icons/MoveDown.png"></img>
                    </div>
                    <div className='list_item_card_button' id={'list_item_card_deleteButton'+this.props.listItem.key} onClick={() => this.props.removeItem(this.props.listItem.key)}>
                    <img src="/images/icons/RemoveItem.png"></img>
                        </div>   
                </div>
            
        );
    }
}

export default ListItemCardToolbar
