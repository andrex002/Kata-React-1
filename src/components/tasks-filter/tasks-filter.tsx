import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

interface TasksFilterProps {
  filter: string;
  onFilterChange: (filterName: string) => void;
}

function TasksFilter({ filter, onFilterChange }: TasksFilterProps) {
  const filterButtonsArr = [
    { filterName: 'all', label: 'All' },
    { filterName: 'active', label: 'Active' },
    { filterName: 'completed', label: 'Completed' },
  ];

  const filterButtons = filterButtonsArr.map((filterButton) => {
    const isActive = filter === filterButton.filterName;
    const buttonClass = isActive ? 'selected' : '';
    return (
      <li key={filterButton.filterName}>
        <button className={buttonClass} onClick={() => onFilterChange(filterButton.filterName)}>
          {filterButton.label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterButtons}</ul>;
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {
    //onFilterChange
  },
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export { TasksFilter };
