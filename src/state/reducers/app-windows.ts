import { ACTIONS } from '../../consts';

const initialState: AppWindowsState = { appWindows: [] };

function appWindows(state: AppWindowsState = initialState, action: AppWindowsReducerAction)
{
  switch (action.type)
  {
    case ACTIONS.APP_WINDOWS.OPEN_APP_WINDOW: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.APP_WINDOWS.TOGGLE_APP_WINDOW_MAXIMIZED_STATUS: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.APP_WINDOWS.UPDATE_APP_WINDOW_POSITION: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.APP_WINDOWS.CLOSE_APP_WINDOW: {
      return Object.assign({}, state, action.payload);
    }
    case ACTIONS.APP_WINDOWS.SET_APP_WINDOW_ACTIVE: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state
    }
  }
}

export default appWindows;