import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  onSubmitHandler = (evt) => {
    evt.preventDefault();

    this.props.onItemAdded(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmitHandler}>
        <input
          className="new-todo"
          name="label"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          onChange={this.onLabelChange}
          name="min"
          min="0"
          max="59"
          placeholder="Min"
          value={this.state.min}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          onChange={this.onLabelChange}
          name="sec"
          min="0"
          max="59"
          placeholder="Sec"
          value={this.state.sec}
          autoFocus
          required
        />
        <button className="visually-hidden" type="submit"></button>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export { NewTaskForm };
