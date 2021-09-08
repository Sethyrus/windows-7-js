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

export const updateAppWindowPosition = (id: string, position: Position) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;
  const appWindowIndex = appWindowsState.appWindows.findIndex(appWindow => appWindow.id === id);

  appWindowsState.appWindows[appWindowIndex].position = position;

  dispatch({ type: ACTIONS.APP_WINDOWS.UPDATE_APP_WINDOW_POSITION, payload: appWindowsState });
}

export const closeAppWindow = (id: string) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;

  appWindowsState.appWindows = appWindowsState.appWindows.filter(appWindow => appWindow.id !== id)

  dispatch({ type: ACTIONS.APP_WINDOWS.CLOSE_APP_WINDOW, payload: appWindowsState });
}

export const setAppWindowActive = (id: string) => async (dispatch: AppWindowsReducerDispatch) =>
{
  const appWindowsState = store.getState().appWindows;

  appWindowsState.appWindows.forEach(function (item, i)
  {
    if (item.id === id)
    {
      appWindowsState.appWindows.splice(i, 1);
      appWindowsState.appWindows.push(item);
    }
  });

  dispatch({ type: ACTIONS.APP_WINDOWS.SET_APP_WINDOW_ACTIVE, payload: appWindowsState });
}