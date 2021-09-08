import { combineReducers } from 'redux';
import startMenu from './start-menu';
import appWindows from './app-windows';
import contextMenu from './context-menu';

const reducers = combineReducers({ startMenu, appWindows, contextMenu });

export default reducers;