import { useDispatch } from "react-redux";
import { openAppWindow } from "../state/actions/app-windows";
import "../styles/StartMenu.scss";
import { v4 as uuid } from "uuid";

const StartMenu = (props: StartMenuProps) => {
  const dispatch = useDispatch();

  return props.open ? (
    <div className="start-menu window glass clean">
      <div className="start-menu-content window glass clean">
        <button
          onClick={() =>
            dispatch(
              openAppWindow({
                id: uuid(),
                position: {
                  x: document.body.clientWidth / 2,
                  y: document.body.clientHeight / 2,
                },
                dimensions: {
                  width: 600,
                  height: 320,
                },
                title: 'Testing the f*cking windows',
                minimized: true,
                maximized: false,
                pristine: true,
              })
            )
          }
        >
          Abrir ventana
        </button>
      </div>
    </div>
  ) : null;
};

export default StartMenu;
