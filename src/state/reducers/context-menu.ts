import { ACTIONS } from '../../consts';

const initialState: ContextMenuState = { open: false, position: { x: 0, y: 0 } };

function startMenu(state: ContextMenuState = initialState, action: ContextMenuReducerAction)
{
  switch (action.type)
  {
    case ACTIONS.CONTEXT_MENU.TOGGLE_CONTEXT_MENU: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.CONTEXT_MENU.OPEN_CONTEXT_MENU: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.CONTEXT_MENU.CLOSE_CONTEXT_MENU: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state
    }
  }
}

export default startMenu;