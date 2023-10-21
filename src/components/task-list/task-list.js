import React from 'react';
import Task from '../task/task';
import './task-list.css';

const TaskList = (props) => {
  const tasks = props.tasks.map(item => {
    return (
      <Task
        key={item.id}
        id={item.id}
        label={item.taskText}
        completed={item.completed}
        editing={item.editing}
        value={item.taskText}
        onDeleted={() => props.onDeleted(item.id)}
        onToogleCompleted={() => props.onToogleCompleted(item.id)}
        onToogleEditing={() => props.onToogleEditing(item.id)}
        onEditing={props.onEditing}
      />
    )
  });
  return (
    <ul className="todo-list">
      {tasks}
    </ul>
  );
};

export default TaskList;