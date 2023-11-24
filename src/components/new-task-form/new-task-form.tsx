import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

interface NewTaskFormProps {
  onItemAdded: (label: string, min: string, sec: string) => void;
}

function NewTaskForm(props: NewTaskFormProps) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    switch (target.name) {
      case 'label':
        setLabel(target.value);
        break;
      case 'min':
        setMin(target.value);
        break;
      case 'sec':
        setSec(target.value);
        break;
    }
  };

  const onSubmitHandler = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    props.onItemAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmitHandler}>
      <input
        className="new-todo"
        name="label"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        onChange={onLabelChange}
        name="min"
        min="0"
        max="59"
        placeholder="Min"
        value={min}
        autoFocus
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        onChange={onLabelChange}
        name="sec"
        min="0"
        max="59"
        placeholder="Sec"
        value={sec}
        autoFocus
        required
      />
      <button className="visually-hidden" type="submit"></button>
    </form>
  );
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export { NewTaskForm };
