import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducers from '../reducers/';
import DevTools from '../containers/devtools';

import { STATUS } from '../actions/';

const INIT_STATE = {
	balance: 0,
	status: {
		status: null,
		message: ''
	},
	transactions: []
};

const configureStore = (initialState = INIT_STATE) => {
	const store = createStore(
		rootReducers,
		initialState,
		compose(
			applyMiddleware(thunk, createLogger()),
			DevTools.instrument()
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/', () => {
			const nextRootReducer = require('../reducers/').default;
			store.replaceReducer(nextRootReducer);
		})
	}

	return store;
};

export default configureStore;