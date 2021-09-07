import store from '..';
import { ACTIONS } from '../../consts';

export const toggleContextMenu = (contextMenu: ContextMenuState = store.getState().contextMenu) => async (dispatch: ContextMenuReducerDispatch) =>
{
  dispatch({ type: ACTIONS.CONTEXT_MENU.TOGGLE_CONTEXT_MENU, payload: { ...store.getState().contextMenu, ...contextMenu } });
}

export const openContextMenu = (position: Position) => async (dispatch: ContextMenuReducerDispatch) =>
{
  dispatch({ type: ACTIONS.CONTEXT_MENU.OPEN_CONTEXT_MENU, payload: { open: true, position } });
}

export const closeContextMenu = () => async (dispatch: ContextMenuReducerDispatch) =>
{
  dispatch({ type: ACTIONS.CONTEXT_MENU.CLOSE_CONTEXT_MENU, payload: { ...store.getState().contextMenu, open: false } });
}