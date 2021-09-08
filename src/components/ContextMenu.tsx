import "../styles/ContextMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import ClickOutside from "./ClickOutside";
import { closeContextMenu } from "../state/actions/context-menu";
import { useEffect, useState } from "react";

const ContextMenu = () => {
  const [contextMenuElement, setContextMenuElement] =
    useState<HTMLDivElement | null>();

  const [directionY, setDirectionY] = useState<"up" | "down" | null>(null);
  const [offsetX, setOffsetX] = useState<number>(0);

  const contextMenu: ContextMenuState = useSelector(
    (state: RootState) => state.contextMenu
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (contextMenuElement) {
      /**
       * Comprueba si el menú se desborda por abajo o no para determinar su
       * dirección. Si lo hace, esta será hacia arriba.
       */
      if (
        document.body.clientHeight - contextMenu.position.y <
        contextMenuElement.clientHeight
      ) {
        setDirectionY("up");
      } else {
        setDirectionY("down");
      }

      /**
       * Comprueba si el menú se desbora por la derecha o no para determinar
       * su offset horizontal. Si lo hace, este será la cantidad de píxeles
       * que sobresalga para que quede ajustado al borde.
       */
      if (
        document.body.clientWidth - contextMenu.position.x <
        contextMenuElement.clientWidth
      ) {
        setOffsetX(
          contextMenuElement.clientWidth -
            (document.body.clientWidth - contextMenu.position.x)
        );
      } else {
        setOffsetX(0);
      }
    } else {
      setDirectionY(null);
      setOffsetX(0);
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
        left: contextMenu.position.x - offsetX,
        top: contextMenu.position.y,
        transform:
          directionY && directionY === "up" ? "translateY(-100%)" : "none",
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
