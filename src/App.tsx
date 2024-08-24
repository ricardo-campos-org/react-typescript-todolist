import React, { useState } from 'react';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

// Styles
import styles from './App.module.css';

// Interfaces
import { ITask } from './interfaces/Task';

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => task.id !== id)
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if (display) {
      modal!.classList.remove('hide');
    } else {
      modal!.classList.add('hide');
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };
    const updatedItems = taskList.map((task) => (task.id === updatedTask.id ? updatedTask : task));

    setTaskList(updatedItems);
    hideOrShowModal(false);
  };

  return (
    <>
      <Modal>
        <TaskForm
          btnText="Update task"
          taskList={taskList}
          task={taskToUpdate}
          handleUpdate={updateTask}
        />
      </Modal>
      <Header />

      <main className={styles.main}>
        <div>
          <h2>What are you going to do?</h2>
          <TaskForm
            btnText="New task"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>

        <div>
          <h2>Your tasks</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
