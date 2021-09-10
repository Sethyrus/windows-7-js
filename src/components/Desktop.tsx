import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";
import AppWindow from "./AppWindow";
import {
  setFocusedAppWindow,
  updateAppWindowPosition,
} from "../state/actions/app-windows";
import { getFunctionality } from "../helpers";

const Desktop = () => {
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [appWindowId, setAppWindowId] = useState<string>("");
  const [appWindowEvent, setAppWindowEvent] = useState<any>();
  const [dragging, setDragging] = useState<boolean>(false);

  const dispatch = useDispatch();
  const appWindows = useSelector((state: RootState) => state.appWindows);
  const startMenuOpen: boolean = useSelector(
    (state: RootState) => state.startMenu.open
  );

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openContextMenu({ x: event.pageX, y: event.pageY }));
    },
    [dispatch]
  );

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

  const onStartDragging = (e: any) => {
    const functionalities = getFunctionality(e);

    if (functionalities.length > 0) {
      const draggableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_DRAGGABLE")
      );

      const frontableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_FRONTABLE")
      );

      if (draggableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find(
          (appWindow) =>
            appWindow.id ===
            functionalities[draggableAppWindowFunctionalityIndex].id
        );

        if (appWindow) {
          if (!appWindow.maximized) {
            setAppWindowId(appWindow.id);

            setOffset({
              x: e.clientX - appWindow.position.x,
              y: e.clientY - appWindow.position.y,
            });

            setDragging(true);
          }
        }
      }

      if (frontableAppWindowFunctionalityIndex !== -1) {
        let isFocusedWindow = false;

        const appWindow = appWindows.appWindows.find((appWindow, i) => {
          if (i === appWindows.appWindows.length - 1) {
            isFocusedWindow = true;
          }

          return (
            appWindow.id ===
            functionalities[frontableAppWindowFunctionalityIndex].id
          );
        });

        if (appWindow && !isFocusedWindow)
          dispatch(setFocusedAppWindow(appWindow.id));
      }
    }
  };

  const onDrag = (e: any) => {
    setAppWindowEvent(e);
  };

  const onStopDragging = (e: any) => {
    setDragging(false);
  };

  return (
    <div className="desktop-container" onMouseEnter={(e) => onStopDragging(e)}>
      <div
        className="desktop"
        onClick={() =>
          startMenuOpen ? dispatch(toggleStartMenu(false)) : null
        }
        onMouseDown={(e) => onStartDragging(e)}
        onMouseMove={(e) => onDrag(e)}
        onMouseUp={(e) => onStopDragging(e)}
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
