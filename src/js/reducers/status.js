import _ from 'lodash';

import STATUS from '../actions/status_codes';
import { RECEIVE_DATA, RECEIVE_DONE, RECEIVE_ERROR } from '../actions/action_types';

/*
 * Initial status state
 */
const INIT_STATUS_STATE = {
	status: null,
	message: null
};

/*
 * Status reducer
 * @param {Object} state
 * @param {Number} state.status
 * @param {String} state.message
 * @param {Object} action
 * @returns {Object}
 */
const status = (state = INIT_STATUS_STATE, action = {}) => {
	switch(action.type) {
		case RECEIVE_DATA:
			return {
				status: STATUS.LOADING,
				message: 'Loading'
			};
		case RECEIVE_DONE:
			return {
				status: STATUS.DONE_LOADING,
				message: _.get(action, 'message', '')
			};
		case RECEIVE_ERROR: 
			return {
				status: STATUS.ERROR,
				message: _.get(action, 'message', 'Unknown Error')
			};
		default:
			return state;
	};
};

export default status;