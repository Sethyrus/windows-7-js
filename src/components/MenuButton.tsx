import { useState } from "react";
import "../styles/MenuButton.scss";
import StartMenu from "./StartMenu";
import menu_icon from "../assets/images/menu_icon.png";
import menu_icon_hover from "../assets/images/menu_icon_hover.png";
import menu_icon_active from "../assets/images/menu_icon_active.png";

const MenuButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="start-button-container">
      <div className="start-button" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="button-icon default">
          <img width={62} height={38} src={menu_icon} alt="Menu Icon" />
        </div>
        <div className="button-icon hover">
          <img
            width={62}
            height={38}
            src={menu_icon_hover}
            alt="Menu Icon Hover"
          />
        </div>
        <div className="button-icon active">
          <img
            width={62}
            height={38}
            src={menu_icon_active}
            alt="Menu Icon Active"
          />
        </div>
      </div>

      <StartMenu open={menuOpen} />
    </div>
  );
};

export default MenuButton;
