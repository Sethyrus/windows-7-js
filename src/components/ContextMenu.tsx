import "../styles/ContextMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import ClickOutside from "./ClickOutside";
import { closeContextMenu } from "../state/actions/context-menu";

const ContextMenu = () => {
  const contextMenu: ContextMenuState = useSelector(
    (state: RootState) => state.contextMenu
  );
  const dispatch = useDispatch();

  return contextMenu.open ? (
    <ClickOutside onClick={() => dispatch(closeContextMenu())}>
      <ul
        role="menu"
        className="context-menu can-hover"
        style={{
          width: 200,
          position: "absolute",
          left: contextMenu.position.x,
          top: contextMenu.position.y,
        }}
      >
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
          <img src="https://img.icons8.com/color/18/000000/monitor--v1.png" />
          <a href="#menu">Screen resolution</a>
        </li>
        <li role="menuitem">
          <img src="https://img.icons8.com/color/18/000000/virtual-machine2.png" />
          <a href="#menu">Gadgets</a>
        </li>
        <li role="menuitem">
          <img src="https://img.icons8.com/color/18/000000/remote-desktop.png" />
          <a href="#menu">Personalize</a>
        </li>
      </ul>
    </ClickOutside>
  ) : null;
};

export default ContextMenu;
