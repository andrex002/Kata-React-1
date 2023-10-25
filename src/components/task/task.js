import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends React.Component {

  state = {
    label: this.props.task.taskText
  }

  getLiClassName = () => {
    let liClassNames;
    if (this.props.task.completed) {
      liClassNames = 'completed';
    } else if (this.props.task.editing) {
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
      this.props.onEditing(this.props.task.id, this.state.label);
      this.setState({
        label: ''
      })
    }
  }

  render() {
    return (
      <li className={this.getLiClassName()} >
        <div className="view">
          <input id={this.props.task.id} className="toggle" type="checkbox" onChange={this.props.onToogleCompleted} checked={this.props.task.completed} />
          <label htmlFor={this.props.task.id}>
            <span className="description">{this.props.task.taskText}</span>
            <span className="created">
              {`created ${formatDistanceToNow(this.props.task.date, {
                includeSeconds: true,
                addSuffix: true
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.props.onToogleEditing}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {this.props.task.editing && <input type="text" className="edit" onChange={this.onLabelEdit} onKeyDown={this.handleEditKeyDown} value={this.state.label} />}
      </li >
    )
  }
}

Task.defaultProps = {
  task: {
    id: Math.random(),
    taskText: 'New Task',
    completed: false,
    editing: false,
    date: new Date()
  }
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    taskText: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date)
  }),
  onDeleted: PropTypes.func.isRequired,
  onToogleCompleted: PropTypes.func.isRequired,
  onToogleEditing: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired
};