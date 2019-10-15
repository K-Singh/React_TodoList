import React, { Component } from 'react'

export class ListTrash extends Component {
    openModal = e => {
        if(this.props.modal.current.className !== "is_visible")
         this.props.modal.current.className = "is_visible";
        else
            this.props.modal.current.className = "";
    }
    render() {
        return (
            <div id="list_trash" onClick={this.openModal}>&#128465;</div>
        )
    }
}

export default ListTrash
