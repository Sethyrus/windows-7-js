import "../styles/StartMenu.scss";

const StartMenu = (props: StartMenuProps) => {
  return props.open ? (
    <div className="start-menu window glass clean">
      <div className="content window glass clean"></div>
    </div>
  ) : null;
};

export default StartMenu;
