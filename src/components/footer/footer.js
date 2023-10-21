import React from 'react';
import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

const Footer = (props) => {
  return (
    <footer className="footer">
      <span className="todo-count">{props.tasksCount} items left</span>
      <TasksFilter filter={props.filter} onFilterChange={props.onFilterChange} />
      <button className="clear-completed" onClick={props.clearCompleted}>Clear completed</button>
    </footer>
  );
};

export default Footer;