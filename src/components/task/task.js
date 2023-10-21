import React from 'react';
import './task.css';

export default class Task extends React.Component {

  state = {
    label: this.props.value
  }

  getLiClassName = () => {
    let liClassNames;
    if (this.props.completed) {
      liClassNames = 'completed';
    } else if (this.props.editing) {
      liClassNames = 'editing';
    }
    return liClassNames;
  }

  onLabelEdit = (evt) => {
    this.setState({
      label: evt.target.value
    });
  }

  handleEditKeyDown = (evt) => {
    if (evt.key === 'Enter' && this.state.label !== '') {
      this.props.onEditing(this.props.id, this.state.label);
      this.setState({
        label: ''
      })
    }
  }

  render() {
    return (
      <li className={this.getLiClassName()} >
        <div className="view">
          <input id={this.props.id} className="toggle" type="checkbox" />
          <label htmlFor={this.props.id} onClick={this.props.onToogleCompleted}>
            <span className="description">{this.props.label}</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.props.onToogleEditing}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {this.props.editing && <input type="text" className="edit" onChange={this.onLabelEdit} onKeyDown={this.handleEditKeyDown} value={this.state.label} ></input>}
      </li >
    )
  }
}

