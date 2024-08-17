'use client';
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database"
import { db } from "../../firebase"
import "./TasksList.css"


export default function TasksList({onCompleteTask}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = data
        ? Object.values(data).map(task => ({ id: task.id, ...task })) // Ensure each task has its ID
        : [];
      setTasks(loadedTasks.filter(task => !task.completed)); // Filter incomplete tasks
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  return (
    <div className='task-list-container'>
      <div className='task-manager'>Unfinished Tasks</div>
      <ul >
        {tasks.map((task, index) => (
          <li className="task-card" key={index}>{task.task}
          <button
              className="complete-button"
              onClick={() => onCompleteTask(task)}
            >
              Complete
            </button></li>
        ))}
        
      </ul>
    </div>
  );
}
