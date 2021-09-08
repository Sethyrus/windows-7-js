import { useDispatch } from "react-redux";
import { openAppWindow } from "../state/actions/app-windows";
import "../styles/StartMenu.scss";

const StartMenu = (props: StartMenuProps) => {
  const dispatch = useDispatch();

  return props.open ? (
    <div className="start-menu window glass clean">
      <div className="content window glass clean">
        <button onClick={() => dispatch(openAppWindow({ id: "asd" }))}>
          Abrir ventana
        </button>
      </div>
    </div>
  ) : null;
};

export default StartMenu;
