import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './src/redux/reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
