import React from 'react';
import Task from '../task/task';
import './task-list.css';

const TaskList = (props) => {
  const tasks = props.tasks.map(item => {
    return <Task key={item.id} label={item.taskText} completed={item.completed} editing={item.editing} />
  });
  return (
    <ul className="todo-list">
      {tasks}
    </ul>
  );
};

export default TaskList;