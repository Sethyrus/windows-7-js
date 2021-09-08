import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";
import AppWindow from "./AppWindow";
import { updateAppWindowPosition } from "../state/actions/app-windows";
import { IDENTIFICATORS } from "../consts";

const Desktop = () => {
  const dispatch = useDispatch();
  const appWindows = useSelector((state: RootState) => state.appWindows);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [appWindowId, setAppWindowId] = useState<string>("");
  const [appWindowEvent, setAppWindowEvent] = useState<any>();

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openContextMenu({ x: event.pageX, y: event.pageY }));
    },
    [dispatch]
  );

  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    if (dragging && appWindowEvent) {
      dispatch(
        updateAppWindowPosition(appWindowId, {
          x: appWindowEvent.clientX - offset.x,
          y: appWindowEvent.clientY - offset.y,
        })
      );
    }
  }, [dragging, appWindowEvent, appWindowId, dispatch, offset]);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  return (
    <div className="desktop-container" onMouseEnter={() => setDragging(false)}>
      <div
        className="desktop"
        onClick={() => dispatch(toggleStartMenu(false))}
        onMouseDown={(e: any) => {
          if (
            e.target.id.substring(0, e.target.id.indexOf("#")) ===
            IDENTIFICATORS.APP_WINDOW_DRAGGABLE
          ) {
            const foundAppWindowId = e.target.id.substring(
              e.target.id.indexOf("#") + 1,
              e.target.id.length
            );

            const appWindow = appWindows.appWindows.find(
              (appWindow) => appWindow.id === foundAppWindowId
            );

            if (appWindow && !appWindow.maximized) {
              setAppWindowId(foundAppWindowId);

              setOffset({
                x: e.clientX - appWindow.position.x,
                y: e.clientY - appWindow.position.y,
              });

              setDragging(true);
            }
          }
        }}
        onMouseMove={(e) => {
          setAppWindowEvent(e);
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
