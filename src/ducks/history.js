// constants
export const PREPEND_PARSED_FILE = 'parser/history/PREPEND_PARSED_FILE';
export const SET_SEARCH = 'parser/history/SET_SEARCH';

/**
 * Getter for initial history reducer state
 * @return {object}
 */
function getInitialState() {
	const filesJson = sessionStorage.getItem('files');
	const files = (filesJson) ? JSON.parse(filesJson) : [];
	
	return {
		search: '',
		files: files
	};
}

/**
 * Reducer - history reducer
 * @param {object} state - prev reducer state
 * @param {object} action - dispatched action
 * @return {object}
 */
export default function historyReducer(state = getInitialState(), action) {
	switch (action.type) {
		case PREPEND_PARSED_FILE : {
			const files = [ ...state.files ];
			
			// prepend new file
			files.unshift(action.payload);
			
			// save file in session storage
			sessionStorage.setItem('files', JSON.stringify(files));
			
			return {
				...state,
				files
			}
		}
		case SET_SEARCH : {
			return {
				...state,
				search: action.payload
			}
		}
		default : {
			return state;
		}
	}
}

/**
 * Action for setting search value
 * @param {string} search - search by file name filter
 * @return {object}
 */
export function setSearch(search) {
	return {
		type: SET_SEARCH,
		payload: search
	}
}