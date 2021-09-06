import { ACTIONS } from '../../consts';
import { StartMenuReducerAction, StartMenuState } from '../../types';

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