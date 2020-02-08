import _ from 'lodash';
import moment from 'moment';

import { ADD_TRANSACTIONS, DEPOSIT, WITHDRAW } from '../actions/action_types';

/*
 * Transaction reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const transaction = (state, action) => {
	switch(action.type) {
		case DEPOSIT:
		case WITHDRAW:
			return {
				//id: action.id,
				text: _.get(action, 'text', ''),
				amount: _.get(action, 'amount', 0),
				balance: _.get(action, 'balance', 0),
				timestamp: moment().format()
			};
		default:
			return state;
	};
};

/*
 * Transactions reducer
 * @param {Array}  state
 * @param {Object} action
 * @returns {Object}
 */
const transactions = (state=[], action) => {
	switch(action.type) {
		case ADD_TRANSACTIONS:
			return _.concat(state, _.get(action, 'transactions', []));
		case WITHDRAW:
		case DEPOSIT:
			return [
				...state,
				transaction(undefined, action)
			];
		default:
			return state;
	};
};

export default transactions;