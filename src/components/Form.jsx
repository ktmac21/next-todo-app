'use client'
import React, { useState, useEffect } from 'react';
import { db, auth } from "../../firebase.js"
import { push, ref, set, onValue, update, remove, query, orderByChild, equalTo } from 'firebase/database'
import styles from './Form.module.css';

const Form = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is logged in');
        return;
      }

      const tasksRef = query(ref(db, 'tasks'), orderByChild('uid'), equalTo(user.uid));

      const unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        const loadedTasks = [];
        const loadedCompletedTasks = [];

        for (let id in data) {
          const task = { id, ...data[id] };
          if (task.completed) {
            loadedCompletedTasks.push(task);
          } else {
            loadedTasks.push(task);
          }
        }
        setTasks(loadedTasks);
        setCompletedTasks(loadedCompletedTasks);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchTasks();
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleDelete = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    remove(taskRef);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      console.error('No user is logged in');
      return;
    }

    try {
      const taskRef = ref(db, 'tasks');
      const newDataRef = push(taskRef);
      set(newDataRef, {
        uid: user.uid, // Store the user's UID
        task: task,
        completed: false
      });
      setTask("");
    } catch (error) {
      console.error("Firebase error", error);
    }
  };

  const handleComplete = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    update(taskRef, { completed: true });
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['task-manager']}>Task Manager</div>
      <main className={styles["main-content"]}>
        <button onClick={handleButtonClick} className={styles["toggle-button"]}>
          {isVisible ? 'Cancel' : 'Add Task'}
        </button>

        {isVisible && (
          <form onSubmit={handleSubmit} className={styles["task-form"]}>
            <input
              type="text"
              value={task}
              onChange={handleInputChange}
              placeholder="Enter your task"
              className="task-input"
            />
            <button type="submit" className={styles["submit-button"]}>
              Submit
            </button>
          </form>
        )}

        <div className={styles["task-list-container"]}>
          <div className={styles["task-manager"]}>Unfinished Tasks</div>
          <ul className={styles["task-list"]}>
            {tasks.map((task) => (
              <li key={task.id} className={styles["task-item"]}>
                <span className={styles["task-text"]}>{task.task}</span>
                <button onClick={() => handleComplete(task.id)} className={styles["complete-button"]}>
                  Complete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["completed-task-list-container"]}>
          <div className={styles["task-manager"]}>Completed Tasks</div>
          <ul className={styles["completed-task-list"]}>
            {completedTasks.map((task) => (
              <li key={task.id} className={styles["task-item"]}>
                <span className={styles["task-text"]}>{task.task}</span>
                <button onClick={() => handleDelete(task.id)} className={styles["delete-button"]}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Form;
