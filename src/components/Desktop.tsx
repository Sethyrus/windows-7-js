import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";

const Desktop = () => {
  const dispatch = useDispatch();

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openContextMenu({ x: event.pageX, y: event.pageY }));
      console.log("EVENT", event);
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  return (
    <div className="desktop-container">
      <div
        className="desktop"
        onClick={() => dispatch(toggleStartMenu(false))}
      ></div>

      <TaskBar />

      <ContextMenu />
    </div>
  );
};

export default Desktop;
