import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import TaskBar from "./TaskBar";
import AppWindow from "./AppWindow";
import {
  closeAppWindow,
  setFocusedAppWindow,
  toggleAppWindowMaximizedStatus,
  updateAppWindowPosition,
} from "../state/actions/app-windows";
import { getFunctionality } from "../helpers";

const Desktop = () => {
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [eventAppWindow, setEventAppWindow] = useState<AppWindow>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [maximizing, setMaximizing] = useState<boolean>(false);

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

  const onMouseDown = (e: any) => {
    const functionalities = getFunctionality(e);

    if (functionalities.length > 0) {
      // Funcionalidad de cerrar ventana
      const closableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_CLOSABLE")
      );

      if (closableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find((appWindow, i) => {
          return (
            appWindow.id ===
            functionalities[closableAppWindowFunctionalityIndex].id
          );
        });

        if (appWindow) {
          setEventAppWindow(appWindow);
          setClosing(true);
          return;
        }
      }

      // Funcionalidad de maximizar ventana
      const maximizableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_MAXIMIZABLE")
      );

      if (maximizableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find((appWindow, i) => {
          return (
            appWindow.id ===
            functionalities[maximizableAppWindowFunctionalityIndex].id
          );
        });

        if (appWindow) {
          setEventAppWindow(appWindow);
          setMaximizing(true);
          return;
        }
      }

      // Funcionalidad de arrastrar ventana
      const draggableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_DRAGGABLE")
      );

      if (draggableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find(
          (appWindow) =>
            appWindow.id ===
            functionalities[draggableAppWindowFunctionalityIndex].id
        );

        if (appWindow) {
          if (!appWindow.maximized) {
            setEventAppWindow(appWindow);

            setOffset({
              x: e.clientX - appWindow.position.x,
              y: e.clientY - appWindow.position.y,
            });

            setDragging(true);
          }
        }
      }

      // Funcionalidad de poner ventana al frente
      const frontableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_FRONTABLE")
      );

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

  const onMouseMove = (e: any) => {
    if (dragging && eventAppWindow) {
      const newX = e.clientX - offset.x,
        newY = e.clientY - offset.y;

      if (
        newX !== eventAppWindow?.position.x &&
        newY !== eventAppWindow?.position.y
      )
        dispatch(
          updateAppWindowPosition(eventAppWindow.id, {
            x: newX,
            y: newY,
          })
        );
    }
  };

  const onMouseUp = (e: any) => {
    if (closing) {
      const functionalities = getFunctionality(e);
      const closableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_CLOSABLE")
      );

      if (closableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find(
          (appWindow) =>
            appWindow.id ===
            functionalities[closableAppWindowFunctionalityIndex].id
        );

        if (appWindow && appWindow.id === eventAppWindow?.id) {
          dispatch(closeAppWindow(appWindow.id));
        }
      }

      setClosing(false);
    } else if (maximizing) {
      const functionalities = getFunctionality(e);

      const maximizableAppWindowFunctionalityIndex = functionalities.findIndex(
        (functionalityObject) =>
          functionalityObject.functionalities.includes("APP_WINDOW_MAXIMIZABLE")
      );

      if (maximizableAppWindowFunctionalityIndex !== -1) {
        const appWindow = appWindows.appWindows.find(
          (appWindow) =>
            appWindow.id ===
            functionalities[maximizableAppWindowFunctionalityIndex].id
        );

        if (appWindow && appWindow.id === eventAppWindow?.id) {
          dispatch(toggleAppWindowMaximizedStatus(appWindow.id));
        }
      }

      setMaximizing(false);
    }

    if (dragging) setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  return (
    <div className="desktop-container" onMouseEnter={(e) => onMouseUp(e)}>
      <div
        className="desktop"
        onClick={() =>
          startMenuOpen ? dispatch(toggleStartMenu(false)) : null
        }
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={(e) => onMouseUp(e)}
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
