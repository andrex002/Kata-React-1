import React from 'react';
import './task.css';

export default class Task extends React.Component {
  state = {
    completed: false,
    editing: false
  }

  onLabelClick = () => {
    this.setState((state) => {
      return {
        completed: !state.completed
      }
    })
  }

  onEditClick = () => {
    this.setState({
      editing: true
    })
  }

  render() {
    let liClassNames = '';
    if (this.state.completed) {
      liClassNames = 'completed';
    } else if (this.state.editing) {
      liClassNames += 'editing';
    }

    return (

      < li className={liClassNames} >
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>{this.props.label}</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditClick}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {this.state.editing && <input type="text" className="edit" ></input>}
      </li >
    )
  }
}
