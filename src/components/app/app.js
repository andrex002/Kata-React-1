import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './app.css';

export default class App extends React.Component {
  numberId = 100;

  state = {
    data: [
      { id: 1, taskText: 'Completed task', completed: false, editing: false },
      { id: 2, taskText: 'Editing task', completed: false, editing: false },
      { id: 3, taskText: 'Active task', completed: false, editing: false }
    ],
    filter: 'all'
  };

  toogleProperty = (arr, id, propName) => {
    const index = arr.findIndex((elem) => {
      return elem.id === id;
    });
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)
    ];
  };

  onToogleCompleted = (id) => {
    this.setState((state) => {
      return {
        data: this.toogleProperty(state.data, id, 'completed')
      };
    })
  };

  onToogleEditing = (id) => {
    this.setState((state) => {
      return {
        data: this.toogleProperty(state.data, id, 'editing')
      };
    })
  };

  addItem = (text) => {
    const newItem = {
      id: this.numberId++,
      taskText: text,
      completed: false,
      editing: false
    }

    this.setState((state) => {
      const newArr = [
        ...state.data,
        newItem
      ];
      return {
        data: newArr
      }
    })
  };

  editItem = (id, text) => {
    const editItem = {
      id: id,
      taskText: text,
      completed: false,
      editing: false
    }

    this.setState((state) => {
      const index = state.data.findIndex((elem) => {
        return elem.id === id;
      });
      const before = state.data.slice(0, index);
      const after = state.data.slice(index + 1);
      const newData = [...before, editItem, ...after];
      return {
        data: newData
      }
    })
  };

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
  };

  filter = (tasks, filterName) => {
    switch (filterName) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  onFilterChange = (filterName) => {
    this.setState({ filter: filterName })
  };

  clearCompleted = () => {
    this.setState((state) => {
      return { data: state.data.filter(task => !task.completed) }
    })
  }

  render() {
    const tasksCount = this.state.data.filter(item => !item.completed).length;
    const visibleTasks = this.filter(this.state.data, this.state.filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDeleted={this.deleteItem}
            onToogleCompleted={this.onToogleCompleted}
            onToogleEditing={this.onToogleEditing}
            onEditing={this.editItem}
          />
          <Footer
            tasksCount={tasksCount}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  };
}
