import { useState } from "react";
import { addTask } from "../api/tasks";
import "../global/styles.css"; // Import the global CSS file

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await addTask({ title, completed: false });
    setTitle("");
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="task-button">Add</button>
    </form>
  );
};

export default TaskForm;
