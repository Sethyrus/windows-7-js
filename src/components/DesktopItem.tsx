import "../styles/DesktopItem.scss";
import bin from "../assets/icons/ui/bin.png";

const DesktopItem = () => (
  <div className="desktop-item">
    <div className="img-wrap">
      <img src={bin} alt="trash bin" />
    </div>
    <p>Lorem ipsum dolor sit amet tal y cual bla blabla bla</p>
  </div>
);

export default DesktopItem;
