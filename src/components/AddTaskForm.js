'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import '../app/add-task/AddTask.css';

function AddTaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await onAddTask(taskName);
        setTaskName('');
        console.log('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      console.error('No user is signed in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter a new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;