import { combineReducers } from 'redux';
import startMenu from './start-menu';
import windows from './windows';

const reducers = combineReducers({ startMenu, windows });

export default reducers;