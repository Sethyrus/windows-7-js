import { useDispatch } from "react-redux";
import { IDENTIFICATORS } from "../consts";
import {
  closeAppWindow,
  setAppWindowActive,
  toggleAppWindowMaximizedStatus,
} from "../state/actions/app-windows";
import "../styles/AppWindow.scss";

const AppWindow = ({ appWindow, id }: AppWindowProps) => {
  const dispatch = useDispatch();

  const getWidth = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.width;

  const getHeight = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.height;

  const getX = () => (appWindow.maximized ? 0 : appWindow.position.x);

  const getY = () => (appWindow.maximized ? 0 : appWindow.position.y);

  return (
    <div
      className="window app-window"
      id={id}
      style={{
        width: getWidth(),
        height: getHeight(),
        top: getY(),
        left: getX(),
      }}
    >
      <div
        className="title-bar"
        id={IDENTIFICATORS.APP_WINDOW_DRAGGABLE + "#" + id}
      >
        <div
          className="title-bar-text"
          id={IDENTIFICATORS.APP_WINDOW_DRAGGABLE + "#" + id}
        >
          A window with contents
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button
            aria-label={appWindow.maximized ? "Restore" : "Maximize"}
            onClick={() => {
              dispatch(toggleAppWindowMaximizedStatus(appWindow.id));
              dispatch(setAppWindowActive(appWindow.id));
            }}
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
