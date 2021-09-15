import { ACTIONS } from './../../consts';
const initialState: DesktopItemsState = { desktopItems: [] };

function desktopItems(state: DesktopItemsState = initialState, action: DesktopItemsReducerAction)
{
  switch (action.type)
  {
    case ACTIONS.DESKTOP_ITEMS.UPDATE_DESKTOP_ITEM_POSITION: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state
    }
  }
}

export default desktopItems;