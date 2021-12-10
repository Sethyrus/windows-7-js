import { ACTIONS } from './../../consts';
import store from '..';


export const updateDesktopItemPosition = (id: string, position: Position) => async (dispatch: DesktopItemsReducerDispatch) =>
{
  const desktopItemsState = store.getState().desktopItems;
  const desktopItemIndex = desktopItemsState.desktopItems.findIndex(desktopItem => desktopItem.id === id);

  desktopItemsState.desktopItems[desktopItemIndex].position = position;

  dispatch({ type: ACTIONS.DESKTOP_ITEMS.UPDATE_DESKTOP_ITEM_POSITION, payload: desktopItemsState });
}