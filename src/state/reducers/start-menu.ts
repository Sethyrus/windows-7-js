import { ACTIONS } from '../../consts';

const initialState: StartMenuState = { open: false };

function startMenu(state: StartMenuState = initialState, action: StartMenuReducerAction)
{
  switch (action.type)
  {
    case ACTIONS.START_MENU.TOGGLE_START_MENU: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state
    }
  }
}

export default startMenu;