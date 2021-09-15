import "../styles/TaskBar.scss";
import Peek from "./Peek";
import StartMenuButton from "./StartMenuButton";

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className="overlay"></div>
      <div className="taskbar-content">
        <StartMenuButton />
        <div className="spacer" />
        <Peek />
      </div>
    </div>
  );
};

export default TaskBar;
