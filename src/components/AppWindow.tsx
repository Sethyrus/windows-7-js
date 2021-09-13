import { useSelector } from "react-redux";
import { setFunctionality } from "../helpers";
import "../styles/AppWindow.scss";

const AppWindow = ({ appWindow, id }: AppWindowProps) => {
  const appWindows = useSelector((state: RootState) => state.appWindows);

  const getWidth = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.width;

  const getHeight = () =>
    appWindow.maximized ? "100%" : appWindow.dimensions.height;

  const getX = () => (appWindow.maximized ? 0 : appWindow.position.x);

  const getY = () => (appWindow.maximized ? 0 : appWindow.position.y);

  const isFocusedWindow = (): boolean => {
    return appWindows.appWindows[appWindows.appWindows.length - 1].id === id;
  };

  return (
    <div
      className={"window app-window" + (isFocusedWindow() ? " active" : "")}
      style={{
        width: getWidth(),
        height: getHeight(),
        top: getY(),
        left: getX(),
      }}
      data-functionality={setFunctionality(id, "APP_WINDOW", [
        "APP_WINDOW_FRONTABLE",
      ])}
    >
      <div
        className="title-bar"
        data-functionality={setFunctionality(id, "APP_WINDOW", [
          "APP_WINDOW_DRAGGABLE",
        ])}
      >
        <div className="title-bar-text">{appWindow.title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button
            aria-label={appWindow.maximized ? "Restore" : "Maximize"}
            data-functionality={setFunctionality(id, "APP_WINDOW", [
              "APP_WINDOW_MAXIMIZABLE",
            ])}
          ></button>
          <button
            aria-label="Close"
            data-functionality={setFunctionality(id, "APP_WINDOW", [
              "APP_WINDOW_CLOSABLE",
            ])}
          ></button>
        </div>
      </div>
      <div className="window-body app-window-body">
        <div className="app-window-content">
          <p>There's so much room for activities!</p>
        </div>
      </div>
    </div>
  );
};

export default AppWindow;
