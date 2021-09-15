import "../styles/TaskBar.scss";
import Peek from "./Peek";
import StartMenuButton from "./StartMenuButton";

const TaskBar = () => {
  return (
    <div className="task-bar">
      <div className="overlay"></div>
      <div className="task-bar-content">
        <StartMenuButton />
        <div className="spacer" />
        <Peek />
      </div>
    </div>
  );
};

export default TaskBar;
