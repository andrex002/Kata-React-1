import React from 'react';
import './tasks-filter.css';

const TasksFilter = (props) => {
  const filterButtonsArr = [
    { filterName: 'all', label: 'All' },
    { filterName: 'active', label: 'Active' },
    { filterName: 'completed', label: 'Completed' },
  ];

  const filterButtons = filterButtonsArr.map(filterButton => {
    const isActive = props.filter === filterButton.filterName;
    const buttonClass = isActive ? 'selected' : '';
    return (
      <li key={filterButton.filterName}>
        <button className={buttonClass} onClick={() => props.onFilterChange(filterButton.filterName)}>{filterButton.label}</button>
      </li>
    )
  })

  return (
    <ul className="filters">
      {filterButtons}
    </ul>
  );
};

export default TasksFilter;