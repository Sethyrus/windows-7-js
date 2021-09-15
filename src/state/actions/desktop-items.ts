

// export const updateDesktopItemPosition = (id: string, position: Position) => async (dispatch: AppWindowsReducerDispatch) =>
// {
//   const appWindowsState = store.getState().appWindows;
//   const appWindowIndex = appWindowsState.appWindows.findIndex(appWindow => appWindow.id === id);

//   appWindowsState.appWindows[appWindowIndex].position = position;

//   dispatch({ type: ACTIONS.APP_WINDOWS.UPDATE_APP_WINDOW_POSITION, payload: appWindowsState });
// }