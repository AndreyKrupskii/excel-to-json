import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../ducks';

const store = configStore();

/**
 * Helper for config store
 * @return {Store<S>}
 */
export function configStore() {
	// store middleware
	const middleware = [
		thunk
	];
	
	// check env and add logger
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(createLogger());
	}
	
	// add hot module replacement
	if (module.hot) {
		module.hot.accept('./../reducers', () => {
			store.replaceReducer(require('../ducks'))
		})
	}
	
	// create store
	return createStore(
		rootReducer,
		applyMiddleware(...middleware)
	);
}

export default store;