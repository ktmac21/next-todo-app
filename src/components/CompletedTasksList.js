import React from 'react';
import './TasksList.css';
import './CompletedTasksList.css';

function CompletedTasksList({ completedTasks, onDeleteTask }) {
  return (
    <div className="task-manager">
      <h2>Completed Tasks</h2>
      <ul className="task-list">
        {completedTasks.map((task) => (
          <li key={task.id} className="task-card completed">
            {task.name}
            <button 
              className="delete-button"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasksList;
