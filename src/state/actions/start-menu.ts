import store from '..';
import { ACTIONS } from '../../consts';

export const toggleStartMenu = (status: boolean = !store.getState().startMenu.open) => async (dispatch: StartMenuReducerDispatch) =>
{
  dispatch({ type: ACTIONS.START_MENU.TOGGLE_START_MENU, payload: { ...store.getState().startMenu, open: status } });
}