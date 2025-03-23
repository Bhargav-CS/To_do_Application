import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>To-Do List</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
