import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
    </div>
  );
};

export default Home;
