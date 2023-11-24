import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import { ITask } from '../../models';
import './task.css';

interface TaskProps {
  task: ITask;
  onDeleted: () => void;
  onToogleCompleted: () => void;
  onToogleEditing: () => void;
  onEditing: (id: string, label: string) => void;
  onPlay: () => void;
  onPaused: () => void;
}

function Task(props: TaskProps) {
  const [label, setLabel] = useState(props.task.taskText);

  const getLiClassName = () => {
    let liClassNames;
    if (props.task.completed) {
      liClassNames = 'completed';
    } else if (props.task.editing) {
      liClassNames = 'editing';
    }
    return liClassNames;
  };

  const onLabelEdit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  };

  const handleEditKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && label !== '') {
      props.onEditing(props.task.id, label);
      setLabel('');
    }
  };

  const { task, onDeleted, onToogleCompleted, onToogleEditing, onPlay, onPaused } = props;
  return (
    <li className={getLiClassName()}>
      <div className="view">
        <input id={task.id} className="toggle" type="checkbox" onChange={onToogleCompleted} checked={task.completed} />
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
        <input type="text" className="edit" onChange={onLabelEdit} onKeyDown={handleEditKeyDown} value={label} />
      )}
    </li>
  );
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
