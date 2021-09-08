import store from '..';
import { ACTIONS } from '../../consts';

export const openAppWindow = (appWindow: AppWindow) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;

  dispatch({ type: ACTIONS.APP_WINDOWS.OPEN_APP_WINDOW, payload: { ...appWindowsState, appWindows: [...appWindowsState.appWindows, appWindow] } });
}