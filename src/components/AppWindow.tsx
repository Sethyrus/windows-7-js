import { useDispatch } from "react-redux";
import { toggleAppWindowMaximizedStatus } from "../state/actions/app-windows";
import "../styles/AppWindow.scss";

const AppWindow = ({ appWindow }: AppWindowProps) => {
  const dispatch = useDispatch();

  const getWidth = () =>
    appWindow.maximized
      ? "100%"
      : appWindow.dimensions.width;

  const getHeight = () =>
    appWindow.maximized
      ? "100%"
      : appWindow.dimensions.height;

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
    >
      <div className="title-bar">
        <div className="title-bar-text">A window with contents</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button
            aria-label={appWindow.maximized ? "Restore" : "Maximize"}
            onClick={() =>
              dispatch(toggleAppWindowMaximizedStatus(appWindow.id))
            }
          ></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <p>There's so much room for activities!</p>
      </div>
    </div>
  );
};

export default AppWindow;
