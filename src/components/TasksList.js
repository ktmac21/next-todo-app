import React from 'react';
import './TasksList.css';

function TasksList({ tasks, onCompleteTask }) {
  return (
    <div className="task-manager">
      <h2>Active Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            {task.name}
            <button 
              className="complete-button"
              onClick={() => onCompleteTask(task.id)}
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
