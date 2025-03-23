import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/tasks";
import "../global/styles.css"; // Import the styles

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="task-list-container">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <div className="task-buttons">
              <button 
                onClick={() => handleToggle(task)}
                style={{ backgroundColor: task.completed ? "blue" : "green", color: "white" }}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button 
                onClick={() => handleDelete(task._id)} 
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
