import React from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

export default class App extends React.Component {
  state = {
    data: [
      { id: 1, taskText: 'Completed task', completed: true, editing: false },
      { id: 2, taskText: 'Editing task', completed: false, editing: true },
      { id: 3, taskText: 'Active task', completed: false, editing: false }
    ]
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const index = state.data.findIndex((elem) => {
        return elem.id === id;
      });
      const before = state.data.slice(0, index);
      const after = state.data.slice(index + 1);
      const newData = [...before, ...after];
      return {
        data: newData
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList tasks={this.state.data} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}
