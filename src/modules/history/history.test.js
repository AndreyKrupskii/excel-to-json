import configureMockStore from 'redux-mock-store';
import historyReducer, {
		setSearch,
		PREPEND_PARSED_FILE,
		SET_SEARCH
	} from './../../ducks/history';

describe('History action creators tests:', () => {
	// define store
	const mockStore = configureMockStore();
	const store = mockStore({
		history: {
			search: '',
			files: []
		}
	});
	
	it(`Should create ${SET_SEARCH} when setSearch is dispatched.`, () => {
		// define search value
		const searchString = 'search';
		
		// define expected value
		const expectedActions = [
			{ type: SET_SEARCH, payload: searchString }
		];
		
		// dispatch to store
		store.dispatch(setSearch('search'));
		
		// check
		expect(store.getActions()).toEqual(expectedActions);
	});
});

describe('History reducer tests:', () => {
	// session storage creator
	const createSessionStorage = () => {
		// items library
		const items = {};
		
		// return sessionStorage mock
		return {
			getItem(name) {
				return items[name];
			},
			setItem(name, value) {
				items[name] = value;
				return items[name];
			}
		}
	};
	
	it('Should return initial state.', () => {
		// create sessionStorage mock
		global.sessionStorage = createSessionStorage();
		
		expect(historyReducer(undefined, {})).toEqual({
			search: '',
			files: []
		});
	});
	
	it(`Should handle ${PREPEND_PARSED_FILE}.`, () => {
		// create sessionStorage mock
		global.sessionStorage = createSessionStorage();
		
		// file mock
		const file = {
			name: 'test.xls',
			json: '{"test": "test"}',
			uploadedAt: +(new Date())
		};
		
		// state
		const state = historyReducer(undefined, {
			type: PREPEND_PARSED_FILE,
			payload: file
		});
		
		// check state
		expect(state).toEqual({
			search: '',
			files: [ file ]
		});
		
		// check sessionStorage
		expect(sessionStorage.getItem('files')).toEqual(
			JSON.stringify([ file ])
		);
	});
	
	it(`Should handle ${SET_SEARCH}.`, () => {
		// create sessionStorage mock
		global.sessionStorage = createSessionStorage();
		
		// search mock
		const search = 'test';
		
		// state
		const state = historyReducer(undefined, {
			type: SET_SEARCH,
			payload: search
		});
		
		// check state
		expect(state).toEqual({
			search,
			files: []
		});
	})
});