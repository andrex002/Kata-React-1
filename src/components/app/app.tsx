import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NewTaskForm } from '../new-task-form/new-task-form';
import { TaskList } from '../task-list/task-list';
import { Footer } from '../footer/footer';
import { ITask } from '../../models';
import './app.css';

function App() {
  const defaultState = [
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
  ];
  const [tasks, setTasks] = useState<ITask[]>(defaultState);
  const [filter, setFilter] = useState('all');

  const toogleProperty = (arr: ITask[], id: string, propName: string): ITask[] => {
    const index = arr.findIndex((elem) => {
      return elem.id === id;
    });
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName as keyof ITask],
    };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const onToogleCompleted = (id: string) => {
    setTasks(toogleProperty(tasks, id, 'completed'));
  };

  const onToogleEditing = (id: string) => {
    setTasks(toogleProperty(tasks, id, 'editing'));
  };

  const addItem = (text: string, min: number | string, sec: number | string) => {
    const newItem = {
      id: uuidv4(),
      taskText: text,
      completed: false,
      editing: false,
      date: new Date(),
      min: Number(min),
      sec: Number(sec),
      timerOn: false,
      intervalId: undefined,
      timerStatus: '',
    };

    setTasks((prevState) => [...prevState, newItem]);
  };

  const editItem = (id: string, text: string) => {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          task.taskText = text;
          task.editing = false;
        }
        return task;
      });
    });
  };

  const deleteItem = (id: string) => {
    setTasks((prevState) => {
      const index = prevState.findIndex((elem) => {
        return elem.id === id;
      });
      const before = prevState.slice(0, index);
      const after = prevState.slice(index + 1);
      const newData = [...before, ...after];
      return newData;
    });
  };

  const filtersTasks = (tasks: ITask[], filterName: string) => {
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

  const onFilterChange = (filterName: string) => {
    setFilter(filterName);
  };

  const clearCompleted = () => {
    setTasks((prevState) => prevState.filter((task) => !task.completed));
  };

  const startsTimer = (taskId: string) => {
    const [{ intervalId, timerStatus }] = tasks.filter((item) => item.id === taskId);
    if (timerStatus === 'stop' || intervalId) return;

    const enablesСountdown = () => {
      const [{ completed }] = tasks.filter((item) => item.id === taskId);
      setTasks((prevState) => {
        const newData = prevState.map((item) => {
          if (item.id === taskId && !completed) {
            if (item.sec === 0) {
              item.min--;
              item.sec = 60;
            }
            item.sec--;
            if (item.min === 0 && item.sec === 0) {
              clearInterval(item.intervalId);
              item.intervalId = undefined;
              item.timerStatus = 'stop';
            }
            item.timerOn = true;
          }

          return item;
        });
        return newData;
      });
    };

    const interval = setInterval(enablesСountdown, 1000);

    setTasks((prevState) => {
      const newData = prevState.map((task) => {
        if (task.id === taskId) {
          task.intervalId = interval;
        }
        return task;
      });
      return newData;
    });
  };

  const pausedTimer = (taskId: string) => {
    const [{ intervalId }] = tasks.filter((item) => item.id === taskId);
    setTasks((prevState) => {
      return prevState.map((item) => {
        if (item.id === taskId) {
          item.intervalId = undefined;
        }
        return item;
      });
    });
    clearInterval(intervalId);
  };

  const tasksCount = tasks.filter((item) => !item.completed).length;
  const visibleTasks = filtersTasks(tasks, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onDeleted={deleteItem}
          onToogleCompleted={onToogleCompleted}
          onToogleEditing={onToogleEditing}
          onEditing={editItem}
          onPlay={startsTimer}
          onPaused={pausedTimer}
        />
        <Footer
          tasksCount={tasksCount}
          filter={filter}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

export { App };
