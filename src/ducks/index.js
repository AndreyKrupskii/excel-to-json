import { combineReducers } from 'redux';
import history from './history';
import file from './file';

export default combineReducers({
	history,
	file
});