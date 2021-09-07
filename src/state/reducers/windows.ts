import { ACTIONS } from '../../consts';

const initialState: WindowsState = { windows: [] };

function windows(state: WindowsState = initialState, action: WindowsReducerAction)
{
  switch (action.type)
  {
    case ACTIONS.WINDOWS.OPEN_WINDOW: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state
    }
  }
}

export default windows;