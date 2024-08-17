export default function CompletedTasksList({completedTasks}) {
    return (
      <div className="task-list-container">
      <div className="task-manager">Completed Tasks</div>
      <ul>
        {completedTasks.map((task, index) => (
          <li className="task-card completed" key={index}>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
    )
}