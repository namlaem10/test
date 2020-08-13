import {contentReducer} from './contentReducer';
import {combineReducers} from 'redux';
const reducer = combineReducers({
  contentReducer,
  // visibilityFilter,
});
export default reducer;
