import "../styles/TaskBar.scss";
import StartMenuButton from "./StartMenuButton";

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className="overlay"></div>
      <div className="content">
        <StartMenuButton />
      </div>
    </div>
  );
};

export default TaskBar;
