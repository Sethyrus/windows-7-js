import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";

const Desktop = () => {
  const dispatch = useDispatch();

  // const [anchorPoint, setAnchorPoint] = useState<Position>({ x: 0, y: 0 });
  // const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openContextMenu({ x: event.pageX, y: event.pageY }));
      // setAnchorPoint({ x: event.pageX, y: event.pageY });
      // setShowContextMenu(true);
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
