import store from '..';
import { ACTIONS } from '../../consts';
import { Window, WindowsReducerDispatch } from '../../types';

export const openWindow = (window: Window) => async (dispatch: WindowsReducerDispatch) =>
{
  const windowsState = store.getState().windows;

  dispatch({ type: ACTIONS.WINDOWS.OPEN_WINDOW, payload: { ...windowsState, windows: [...windowsState.windows, window] } });
}