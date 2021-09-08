import store from '..';
import { ACTIONS } from '../../consts';

export const openAppWindow = (appWindow: AppWindow) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;

  dispatch({ type: ACTIONS.APP_WINDOWS.OPEN_APP_WINDOW, payload: { ...appWindowsState, appWindows: [...appWindowsState.appWindows, appWindow] } });
}

export const toggleAppWindowMaximizedStatus = (id: string, status?: boolean) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;
  const appWindowIndex = appWindowsState.appWindows.findIndex(appWindow => appWindow.id === id);

  appWindowsState.appWindows[appWindowIndex].maximized = status !== undefined ? status : !appWindowsState.appWindows[appWindowIndex].maximized;

  dispatch({ type: ACTIONS.APP_WINDOWS.TOGGLE_APP_WINDOW_MAXIMIZED_STATUS, payload: appWindowsState });
}