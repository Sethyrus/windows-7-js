import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducers from './reducers';

const state = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));

export default state;