import "../styles/ContextMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import ClickOutside from "./ClickOutside";
import { closeContextMenu } from "../state/actions/context-menu";
import { useEffect, useState } from "react";

const ContextMenu = () => {
  const [contextMenuElement, setContextMenuElement] =
    useState<HTMLDivElement | null>();

  const [direction, setDirection] = useState<"up" | "down" | null>();

  const contextMenu: ContextMenuState = useSelector(
    (state: RootState) => state.contextMenu
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (contextMenuElement) {
      if (
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) -
          contextMenu.position.y <
        contextMenuElement.clientHeight
      ) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    } else {
      setDirection(null);
    }
  }, [contextMenuElement, contextMenu]);

  return contextMenu.open ? (
    <div
      className="context-menu-container"
      ref={(divElement) => {
        setContextMenuElement(divElement);
      }}
      style={{
        width: 200,
        position: "absolute",
        left: contextMenu.position.x,
        top: contextMenu.position.y,
        transform:
          direction && direction === "up" ? "translateY(-100%)" : "none",
      }}
    >
      <ClickOutside onClick={() => dispatch(closeContextMenu())}>
        <ul role="menu" className="can-hover">
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            View
          </li>
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Sort by
            <ul role="menu">
              <li role="menuitem">
                <a href="#menu">Name</a>
              </li>
              <li role="menuitem">
                <a href="#menu">Size</a>
              </li>
              <li role="menuitem">
                <a href="#menu">Item type</a>
              </li>
              <li role="menuitem">
                <a href="#menu">Date modified</a>
              </li>
            </ul>
          </li>
          <li role="menuitem" className="has-divider">
            <a href="#menu">Refresh</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Paste</a>
          </li>
          <li role="menuitem" className="has-divider">
            <a href="#menu">Paste shortcut</a>
          </li>
          <li role="menuitem">
            <img
              src="https://img.icons8.com/color/18/000000/monitor--v1.png"
              alt="screen-icon"
            />
            <a href="#menu">Screen resolution</a>
          </li>
          <li role="menuitem">
            <img
              src="https://img.icons8.com/color/18/000000/virtual-machine2.png"
              alt="computer1-icon"
            />
            <a href="#menu">Gadgets</a>
          </li>
          <li role="menuitem">
            <img
              src="https://img.icons8.com/color/18/000000/remote-desktop.png"
              alt="computer2-icon"
            />
            <a href="#menu">Personalize</a>
          </li>
        </ul>
      </ClickOutside>
    </div>
  ) : null;
};

export default ContextMenu;
