import "../styles/TaskBar.scss";
import MenuButton from "./StartMenuButton";

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className="overlay"></div>
      <div className="content">
        <MenuButton />
      </div>
    </div>
  );
};

export default TaskBar;
