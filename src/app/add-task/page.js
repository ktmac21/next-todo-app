"use client";
import { useRef, useState, useEffect } from "react";
import CompletedTasksList from "@/components/CompletedTasksList";
import "./AddTask.css"
import TasksList from "@/components/TasksList";
import { addATask } from "../../../lib/actions";
import { ref, onValue, update } from "firebase/database"
import { db } from "../../../firebase"



  export default function AddTask() {
    const taskInputRef = useRef(null); // Create a ref to access the input field
    const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = data ? Object.values(data) : [];
      setTasks(loadedTasks.filter(task => !task.completed)); // Filter incomplete tasks
      setCompletedTasks(loadedTasks.filter(task => task.completed)); // Filter completed tasks
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      const formData = new FormData(e.target); // Collect the form data
      await addATask(formData); // Call the Server Action to add the task
  
      if (taskInputRef.current) {
        taskInputRef.current.value = ""; // Clear the input field after submission
      }
    };

    const handleCompleteTask = async (task) => {
      if (!task.id) {
        console.error("Task ID is missing. Cannot complete task.");
        return;
      }
    
      const taskRef = ref(db, `tasks/${task.id}`);
      try {
        await update(taskRef, { completed: true });
        console.log(`Task ${task.id} marked as completed.`);
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    };
  

  
  return (
    <div className="form-container">
      <main className="main-content">
        <div className="task-manager">Task Manager</div>

        <button className="toggle-button">
          Add Task
        </button>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            name="task"
            type="text"
            placeholder="Enter your task"
            className="task-input"
            ref={taskInputRef}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <TasksList onCompleteTask={handleCompleteTask} />
        <CompletedTasksList completedTasks={completedTasks} />
        
      </main>
    </div>
  );
}
