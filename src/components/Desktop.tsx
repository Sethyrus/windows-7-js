import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenu } from "../state/actions/context-menu";
import { toggleStartMenu } from "../state/actions/start-menu";
import "../styles/Desktop.scss";
import ContextMenu from "./ContextMenu";
import DesktopItem from "./DesktopItem";
import TaskBar from "./TaskBar";
import AppWindow from "./AppWindow";
import {
  closeAppWindow,
  setFocusedAppWindow,
  toggleAppWindowMaximizedStatus,
  updateAppWindowPosition,
} from "../state/actions/app-windows";
import { getEventFunctionalities, setFunctionality } from "../helpers";

const Desktop = () => {
  const [currEvent, setCurrEvent] = useState<FunctionalityEvent>();
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

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
    const functionalities = getEventFunctionalities(e);

    functionalities.forEach((functionalityObject) => {
      functionalityObject.functionalities.forEach((functionality) =>
        initFunctionality(functionalityObject.id, functionality, e)
      );
    });
  };

  const initFunctionality = (
    id: string,
    functionality: Functionality,
    e: any
  ) => {
    let appWindow: AppWindow | undefined;

    switch (functionality) {
      case "APP_WINDOW_CLOSABLE":
        appWindow = appWindows.appWindows.find(
          (appWindow, i) => appWindow.id === id
        );

        if (appWindow) {
          setCurrEvent({
            component: "APP_WINDOW",
            entity: appWindow,
            action: "CLOSE",
          });
        }
        break;
      case "APP_WINDOW_DRAGGABLE":
        appWindow = appWindows.appWindows.find(
          (appWindow) => appWindow.id === id
        );

        if (appWindow) {
          if (!appWindow.maximized) {
            setCurrEvent({
              component: "APP_WINDOW",
              entity: appWindow,
              action: "DRAG",
            });

            setOffset({
              x: e.clientX - appWindow.position.x,
              y: e.clientY - appWindow.position.y,
            });
          }
        }
        break;
      case "APP_WINDOW_FRONTABLE":
        let isFocusedWindow = false;

        appWindow = appWindows.appWindows.find((appWindow, i) => {
          if (i === appWindows.appWindows.length - 1) {
            isFocusedWindow = true;
          }

          return appWindow.id === id;
        });

        if (appWindow && !isFocusedWindow)
          dispatch(setFocusedAppWindow(appWindow.id));
        break;
      case "APP_WINDOW_MAXIMIZABLE":
        appWindow = appWindows.appWindows.find(
          (appWindow, i) => appWindow.id === id
        );

        if (appWindow) {
          setCurrEvent({
            component: "APP_WINDOW",
            entity: appWindow,
            action: "MAXIMIZE",
          });
        }
        break;
      case "DESKTOP_SELECTABLE":
        setCurrEvent({
          component: "DESKTOP",
          action: "SELECT",
          entity: {
            id: "",
            position: {
              x: e.clientX,
              y: e.clientY,
            },
            width: 0,
            height: 0,
          },
        });
        break;
    }
  };

  const onMouseMove = (e: any) => {
    if (currEvent) {
      if (currEvent.action === "DRAG") {
        if (currEvent.component === "APP_WINDOW") {
          const newX = e.clientX - offset.x,
            newY = e.clientY - offset.y;

          if (
            newX !== currEvent.entity?.position.x &&
            newY !== currEvent.entity?.position.y
          )
            dispatch(
              updateAppWindowPosition(currEvent.entity?.id || "", {
                x: newX,
                y: newY,
              })
            );
        }
      } else if (currEvent.action === "SELECT") {
        if (currEvent.component === "DESKTOP") {
        }
      }
    }
  };

  const onMouseUp = (e: any) => {
    const functionalities = getEventFunctionalities(e);

    functionalities.forEach((functionalityObject) => {
      functionalityObject.functionalities.forEach((functionality) =>
        endFunctionality(functionalityObject.id, functionality, e)
      );
    });
  };

  const endFunctionality = (
    id: string,
    functionality: Functionality,
    e: any
  ) => {
    let appWindow: AppWindow | undefined;

    switch (functionality) {
      case "APP_WINDOW_CLOSABLE":
        if (
          currEvent?.action === "CLOSE" &&
          currEvent.component === "APP_WINDOW"
        ) {
          appWindow = appWindows.appWindows.find(
            (appWindow) => appWindow.id === id
          );

          if (appWindow && appWindow.id === currEvent?.entity.id)
            dispatch(closeAppWindow(appWindow.id));
        }

        break;
      case "APP_WINDOW_MAXIMIZABLE":
        if (
          currEvent?.action === "MAXIMIZE" &&
          currEvent.component === "APP_WINDOW"
        ) {
          appWindow = appWindows.appWindows.find(
            (appWindow) => appWindow.id === id
          );

          if (appWindow && appWindow.id === currEvent?.entity.id)
            dispatch(toggleAppWindowMaximizedStatus(appWindow.id));
        }
        break;
      }

      setCurrEvent(undefined);
    };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  return (
    <div className="desktop" onMouseEnter={(e) => onMouseUp(e)}>
      <div
        className="desktop-layout"
        data-functionality={setFunctionality("", "DESKTOP", [
          "DESKTOP_SELECTABLE",
        ])}
        onClick={() =>
          startMenuOpen ? dispatch(toggleStartMenu(false)) : null
        }
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={(e) => onMouseUp(e)}
      >
        <DesktopItem />

        {currEvent &&
          currEvent.action === "SELECT" &&
          currEvent.component === "DESKTOP" && (
            <div className="selection"></div>
          )}

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
