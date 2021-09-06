import "../styles/MenuButton.scss";
import StartMenu from "./StartMenu";
import menu_icon from "../assets/images/menu_icon.png";
import menu_icon_hover from "../assets/images/menu_icon_hover.png";
import menu_icon_active from "../assets/images/menu_icon_active.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { toggleStartMenu } from "../state/actions/start-menu";

const StartMenuButton = () => {
  const dispath = useDispatch();
  const startMenuOpen: boolean = useSelector(
    (state: RootState) => state.startMenu.open
  );

  return (
    <div className="start-menu-button-container">
      <div
        className="start-menu-button"
        onClick={() => dispath(toggleStartMenu())}
      >
        <div className="start-menu-button-icon default">
          <img width={62} height={38} src={menu_icon} alt="Menu Icon" />
        </div>
        <div className="start-menu-button-icon hover">
          <img
            width={62}
            height={38}
            src={menu_icon_hover}
            alt="Menu Icon Hover"
          />
        </div>
        <div className="start-menu-button-icon active">
          <img
            width={62}
            height={38}
            src={menu_icon_active}
            alt="Menu Icon Active"
          />
        </div>
      </div>

      <StartMenu open={startMenuOpen} />
    </div>
  );
};

export default StartMenuButton;
