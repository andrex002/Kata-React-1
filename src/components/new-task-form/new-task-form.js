import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: ''
  }

  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value
    });
  }

  onPressKeyDown = (evt) => {
    if (evt.key === 'Enter' && this.state.label !== '') {
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: ''
      })
    }
  }

  render() {
    return (
      <input className="new-todo"
        onChange={this.onLabelChange}
        onKeyDown={this.onPressKeyDown}
        placeholder="What needs to be done?"
        value={this.state.label}
        autoFocus />
    )
  }
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired
}