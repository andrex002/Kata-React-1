import React from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

const data = [
  { id: 1, taskText: 'Completed task', completed: true, editing: false },
  { id: 2, taskText: 'Editing task', completed: false, editing: true },
  { id: 3, taskText: 'Active task', completed: false, editing: false }
];

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={data} />
        <Footer />
      </section>
    </section>
  );
};

export default App;