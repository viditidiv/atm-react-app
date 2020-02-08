import { combineReducers } from 'redux';
import balance from './balance';
import status from './status';
import transactions from './transactions';

/*
 * Base reducer, which combines all of the reducers
 */
const rootReducers = combineReducers({
	balance,
	status,
	transactions,
});

export default rootReducers;