import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";
import AppWindow from "./AppWindow";

const Desktop = () => {
  const dispatch = useDispatch();
  const appWindows = useSelector((state: RootState) => state.appWindows);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openContextMenu({ x: event.pageX, y: event.pageY }));
    },
    [dispatch]
  );

  const [dragging, setDragging] = useState<boolean>(false);

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
        onMouseDown={(e) => {
          setDragging(true);
          console.log("E", e);
          // setOffset({
          //   x: e.clientX - appWindow.position.x,
          //   y: e.clientY - appWindow.position.y,
          // });
        }}
        onMouseMove={(e) => {
          // if (dragging) {
          //   dispatch(
          //     updateAppWindowPosition(appWindow.id, {
          //       x: e.clientX - offset.x,
          //       y: e.clientY - offset.y,
          //     })
          //   );
          // }
        }}
        onMouseUp={(e) => {
          setDragging(false);
        }}
      >
        {appWindows.appWindows.map((appWindow, i) => (
          <AppWindow id={appWindow.id} appWindow={appWindow} key={i} />
        ))}
      </div>

      <TaskBar />

      <ContextMenu />
    </div>
  );
};

export default Desktop;
