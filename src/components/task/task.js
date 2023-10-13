import React from 'react';
import './task.css';

const Task = (props) => {
  let liClass;
  if (props.completed) {
    liClass = 'completed';
  } else if (props.editing) {
    liClass = 'editing';
  } else {
    liClass = '';
  }



  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{props.label}</span>
          <span className="created">created 5 minutes ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {props.editing && <input type="text" className="edit" value="Editing task"></input>}
    </li>
  );
};

export default Task;