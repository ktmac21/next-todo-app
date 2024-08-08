'use client'

import React, { useState, useEffect } from 'react';
import { db } from "../../firebase.js"
import { push, ref, set, onValue } from 'firebase/database'
import './form.css';

const Form = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Create a reference to the tasks node in the database
    const tasksRef = ref(db, 'tasks');

    // Listen for changes in the tasks data
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = [];
      for (let id in data) {
        loadedTasks.push({ id, text: data[id].task });
      }
      setTasks(loadedTasks);
    });

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!task.trim()) return; // Prevent adding empty tasks

    try {
      const taskRef = ref(db, 'tasks');
      const newDataRef = push(taskRef);

      set(newDataRef, {
        task: task,
      });
      setTask(""); // Clear the input field
      alert("Data added successfully!");
    } catch (error) {
      console.log("Firebase error", error);
    }
  }

  return (
    <div className="form-container">
      <button onClick={handleButtonClick} className="toggle-button">
        {isVisible ? 'Cancel' : 'Add Task'}
      </button>
      {isVisible && (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter your task"
            className="task-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
