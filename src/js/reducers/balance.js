import _ from 'lodash';

import { FETCH_BALANCE, UPDATE_BALANCE } from '../actions/action_types';

/*
 * Reducer for the balance state
 * @param {Number} state
 * @param {Object} action
 * @param {Object}
 */
const balance = (state=0, action) => {
	switch(action.type) {
		case FETCH_BALANCE:
			return state;
		case UPDATE_BALANCE:
			return _.get(action, 'balance', 0);
		default:
			return state;
	};
};

export default balance;