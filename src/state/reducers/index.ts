import { combineReducers } from 'redux';
import startMenu from './start-menu';
import appWindows from './app-windows';
import contextMenu from './context-menu';
import desktopItems from './desktop-items';

const reducers = combineReducers({ startMenu, appWindows, contextMenu, desktopItems });

export default reducers;