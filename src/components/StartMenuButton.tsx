import "../styles/StartMenuButton.scss";
import StartMenu from "./StartMenu";
import menu_icon from "../assets/icons/menu-icon/menu-icon.png";
import menu_icon_hover from "../assets/icons/menu-icon/menu-icon-hover.png";
import menu_icon_active from "../assets/icons/menu-icon/menu-icon-active.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleStartMenu } from "../state/actions/start-menu";

const StartMenuButton = () => {
  const dispath = useDispatch();
  const startMenuOpen: boolean = useSelector(
    (state: RootState) => state.startMenu.open
  );

  return (
    <div className="start-menu-button">
      <div
        className="start-menu-button-content"
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
