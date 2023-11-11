import React from 'react';
import PropTypes from 'prop-types';

import { Task } from '../task/task';
import './task-list.css';

const TaskList = ({ tasks, onDeleted, onToogleCompleted, onToogleEditing, onEditing, onPlay, onPaused }) => {
  const tasksList = tasks.map((item) => {
    return (
      <Task
        key={item.id}
        task={item}
        onDeleted={() => onDeleted(item.id)}
        onToogleCompleted={() => onToogleCompleted(item.id)}
        onToogleEditing={() => onToogleEditing(item.id)}
        onEditing={onEditing}
        onPlay={() => onPlay(item.id)}
        onPaused={() => onPaused(item.id)}
      />
    );
  });
  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.defaultProps = {
  tasks: [],
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onDeleted: PropTypes.func.isRequired,
  onToogleCompleted: PropTypes.func.isRequired,
  onToogleEditing: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPaused: PropTypes.func.isRequired,
};

export { TaskList };
