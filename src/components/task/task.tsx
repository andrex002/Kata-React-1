import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

class Task extends React.Component {
  state = {
    label: this.props.task.taskText,
  };

  getLiClassName = () => {
    let liClassNames;
    if (this.props.task.completed) {
      liClassNames = 'completed';
    } else if (this.props.task.editing) {
      liClassNames = 'editing';
    }
    return liClassNames;
  };

  onLabelEdit = (evt) => {
    this.setState({
      label: evt.target.value,
    });
  };

  handleEditKeyDown = (evt) => {
    if (evt.key === 'Enter' && this.state.label !== '') {
      this.props.onEditing(this.props.task.id, this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { task, onDeleted, onToogleCompleted, onToogleEditing, onPlay, onPaused } = this.props;
    return (
      <li className={this.getLiClassName()}>
        <div className="view">
          <input
            id={task.id}
            className="toggle"
            type="checkbox"
            onChange={onToogleCompleted}
            checked={task.completed}
          />
          <label htmlFor={task.id}>
            <span className="title">{task.taskText}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onPlay}></button>
              <button className="icon icon-pause" onClick={onPaused}></button>
              <span className="countdown">{`${task.min < 10 ? '0' + task.min : task.min}:${
                task.sec < 10 ? '0' + task.sec : task.sec
              }`}</span>
            </span>
            <span className="description">
              {`created ${formatDistanceToNow(task.date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToogleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {task.editing && (
          <input
            type="text"
            className="edit"
            onChange={this.onLabelEdit}
            onKeyDown={this.handleEditKeyDown}
            value={this.state.label}
          />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  task: {
    id: Math.random(),
    taskText: 'New Task',
    completed: false,
    editing: false,
    date: new Date(),
    min: 5,
    sec: 0,
  },
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    taskText: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    min: PropTypes.number,
    sec: PropTypes.number,
  }),
  onDeleted: PropTypes.func.isRequired,
  onToogleCompleted: PropTypes.func.isRequired,
  onToogleEditing: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPaused: PropTypes.func.isRequired,
};

export { Task };
