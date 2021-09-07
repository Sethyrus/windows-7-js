import store from '..';
import { ACTIONS } from '../../consts';

export const openWindow = (window: AppWindow) => async (dispatch: WindowsReducerDispatch) =>
{
  const windowsState = store.getState().windows;

  dispatch({ type: ACTIONS.WINDOWS.OPEN_WINDOW, payload: { ...windowsState, windows: [...windowsState.windows, window] } });
}