'use server';
import  { db } from "../firebase"
import { ref, push, set } from "firebase/database"

export async function addATask(formData) {
  const tasksRef = ref(db, "tasks");
  const newTaskRef = push(tasksRef); // Generate a new task reference with a unique key
  const task = {
    id: newTaskRef.key, // Store the Firebase-generated key as the task ID
    task: formData.get("task"),
    completed: false, // Ensure tasks are marked as incomplete by default
  };

  try {
    await set(newTaskRef, task); // Save the task to Firebase using the generated key
    console.log("Task added successfully:", task);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}