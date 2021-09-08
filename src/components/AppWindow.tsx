import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  closeAppWindow,
  toggleAppWindowMaximizedStatus,
  updateAppWindowPosition,
} from "../state/actions/app-windows";
import "../styles/AppWindow.scss";

const AppWindow = ({ appWindow }: AppWindowProps) => {
  const dispatch = useDispatch();

  const [appWindowElement, setAppWindowElement] =
    useState<HTMLDivElement | null>();

  const [dragging, setDragging] = useState<boolean>(false);

  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const getWidth = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.width;

  const getHeight = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.height;

  const getX = () => (appWindow.maximized ? 0 : appWindow.position.x);

  const getY = () => (appWindow.maximized ? 0 : appWindow.position.y);

  return (
    <div
      className="window app-window"
      style={{
        width: getWidth(),
        height: getHeight(),
        top: getY(),
        left: getX(),
      }}
      ref={(divElement) => {
        setAppWindowElement(divElement);
      }}
    >
      <div
        className="title-bar"
        // draggable
        onMouseDown={(e) => {
          setDragging(true);
          setOffset({
            x: e.clientX - appWindow.position.x,
            y: e.clientY - appWindow.position.y,
          });
        }}
        // onDragStart={(e) => {
        //   setOffset({
        //     x: e.clientX - appWindow.position.x,
        //     y: e.clientY - appWindow.position.y,
        //   });
        // }}
        onMouseMove={(e) => {
          if (dragging) {
            dispatch(
              updateAppWindowPosition(appWindow.id, {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
              })
            );
          }
        }}
        onMouseUp={(e) => {
          setDragging(false);
        }}
        // onDrag={(e) => {
        //   dispatch(
        //     updateAppWindowPosition(appWindow.id, {
        //       x: e.clientX - offset.x,
        //       y: e.clientY - offset.y,
        //     })
        //   );
        // }}
        // onDragOver={(e) => e.preventDefault()}
        // onDragEnd={(e) => {}}
      >
        <div className="title-bar-text">A window with contents</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button
            aria-label={appWindow.maximized ? "Restore" : "Maximize"}
            onClick={() =>
              dispatch(toggleAppWindowMaximizedStatus(appWindow.id))
            }
          ></button>
          <button
            aria-label="Close"
            onClick={() => dispatch(closeAppWindow(appWindow.id))}
          ></button>
        </div>
      </div>
      <div className="window-body">
        <p>There's so much room for activities!</p>
      </div>
    </div>
  );
};

export default AppWindow;
