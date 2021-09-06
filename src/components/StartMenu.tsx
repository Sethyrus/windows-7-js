import "../styles/StartMenu.scss";
import { StartMenuProps } from "../types";

const StartMenu = (props: StartMenuProps) =>
  props.open ? (
    <div className="start-menu window glass clean">
      <div className="content window glass clean"></div>
    </div>
  ) : null;

export default StartMenu;
