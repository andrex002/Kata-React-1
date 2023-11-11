import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NewTaskForm } from '../new-task-form/new-task-form';
import { TaskList } from '../task-list/task-list';
import { Footer } from '../footer/footer';
import './app.css';

class App extends React.Component {
  state = {
    data: [
      {
        id: '1',
        taskText: 'Completed task',
        completed: false,
        editing: false,
        date: new Date(),
        min: 1,
        sec: 0,
      },
      {
        id: '2',
        taskText: 'Editing task',
        completed: false,
        editing: false,
        date: new Date(),
        min: 1,
        sec: 0,
      },
      {
        id: '3',
        taskText: 'Active task',
        completed: false,
        editing: false,
        date: new Date(),
        min: 1,
        sec: 0,
      },
    ],
    filter: 'all',
  };

  toogleProperty = (arr, id, propName) => {
    const index = arr.findIndex((elem) => {
      return elem.id === id;
    });
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  onToogleCompleted = (id) => {
    this.setState((state) => {
      return {
        data: this.toogleProperty(state.data, id, 'completed'),
      };
    });
  };

  onToogleEditing = (id) => {
    this.setState((state) => {
      return {
        data: this.toogleProperty(state.data, id, 'editing'),
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = {
      id: uuidv4(),
      taskText: text,
      completed: false,
      editing: false,
      date: new Date(),
      min: Number(min),
      sec: Number(sec),
      timerOn: false,
    };

    this.setState((state) => {
      const newArr = [...state.data, newItem];
      return {
        data: newArr,
      };
    });
  };

  editItem = (id, text) => {
    this.setState((state) => {
      return {
        data: state.data.map((task) => {
          if (task.id === id) {
            task.taskText = text;
            task.editing = false;
          }
          return task;
        }),
      };
    });
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
        data: newData,
      };
    });
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
    this.setState({ filter: filterName });
  };

  clearCompleted = () => {
    this.setState((state) => {
      return { data: state.data.filter((task) => !task.completed) };
    });
  };

  startsTimer = (taskId) => {
    let [{ intervalId, timerStatus }] = this.state.data.filter((item) => item.id === taskId);
    if (timerStatus === 'stop' || intervalId) return;

    const enablesСountdown = () => {
      const [{ completed }] = this.state.data.filter((item) => item.id === taskId);
      this.setState(({ data }) => {
        const newData = data.map((item) => {
          if (item.id === taskId && !completed) {
            if (item.sec === 0) {
              item.min--;
              item.sec = 60;
            }
            item.sec--;
            if (item.min === 0 && item.sec === 0) {
              clearInterval(item.intervalId);
              item.intervalId = null;
              item.timerStatus = 'stop';
            }
            item.timerOn = true;
          }

          return item;
        });
        return { data: newData };
      });
    };
    let interval = setInterval(enablesСountdown, 1000);
    this.setState(({ data }) => {
      const newData = data.map((task) => {
        if (task.id === taskId) {
          task.intervalId = interval;
        }
        return task;
      });
      return { data: newData };
    });
  };

  pausedTimer = (taskId) => {
    const [{ intervalId }] = this.state.data.filter((item) => item.id === taskId);
    this.setState(({ data }) => {
      return {
        data: data.map((item) => {
          if (item.id === taskId) {
            item.intervalId = null;
          }
          return item;
        }),
      };
    });
    clearInterval(intervalId);
  };

  render() {
    const tasksCount = this.state.data.filter((item) => !item.completed).length;
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
            onPlay={this.startsTimer}
            onPaused={this.pausedTimer}
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
  }
}

export { App };
