import { combineReducers } from 'redux';
import startMenu from './start-menu';
import windows from './windows';
import contextMenu from './context-menu';

const reducers = combineReducers({ startMenu, windows, contextMenu });

export default reducers;