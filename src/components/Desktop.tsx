import { useDispatch } from "react-redux";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import TaskBar from "./TaskBar";

const Desktop = () => {
  const dispatch = useDispatch();

  return (
    <div className="desktop-container">
      <div
        className="desktop"
        onClick={() => dispatch(toggleStartMenu(false))}
      ></div>
      <TaskBar />
    </div>
  );
};

export default Desktop;
