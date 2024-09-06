'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database';
import { useRouter } from 'next/navigation';
import AddTaskForm from '@/components/AddTaskForm';
import TasksList from '@/components/TasksList';
import CompletedTasksList from '@/components/CompletedTasksList';
import './AddTask.css';

export default function AddTask() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user.uid);
        setUser(user);
        // Fetch tasks when user is authenticated
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + user.uid);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          console.log('Fetched data:', data);
          if (data) {
            const loadedTasks = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            console.log('Loaded tasks:', loadedTasks);
            const activeTasks = loadedTasks.filter(task => !task.completed);
            const completedTasks = loadedTasks.filter(task => task.completed);
            setTasks(activeTasks);
            setCompletedTasks(completedTasks);
          } else {
            console.log('No tasks found');
            setTasks([]);
            setCompletedTasks([]);
          }
        }, (error) => {
          console.error('Error fetching tasks:', error);
        });
      } else {
        console.log('User not authenticated, redirecting to sign-in');
        router.push('/sign-in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const addTask = async (taskName) => {
    try {
      const db = getDatabase();
      const tasksRef = ref(db, 'tasks/' + user.uid);
      await push(tasksRef, {
        name: taskName,
        completed: false,
        createdAt: Date.now()
      });
      console.log('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `tasks/${user.uid}/${taskId}`);
      await update(taskRef, { completed: true });
      console.log('Task completed successfully');
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `tasks/${user.uid}/${taskId}`);
      await remove(taskRef);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div className="add-task-container">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  console.log('Rendering tasks:', tasks);
  console.log('Rendering completed tasks:', completedTasks);

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <div className="floating-icon">✨</div>
        <h1 className="add-task-title">Add a New Task</h1>
        <AddTaskForm onAddTask={addTask} />
        <TasksList tasks={tasks} onCompleteTask={completeTask} />
        <CompletedTasksList completedTasks={completedTasks} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
}
