// initial state
const initialState = {
	search: '',
	files: []
};

/**
 * Reducer - history reducer
 * @param {object} state - prev reducer state
 * @param {object} action - dispatched action
 * @return {object}
 */
export default function historyReducer(state = initialState, action) {
	switch (action.type) {
		default : {
			return state;
		}
	}
}