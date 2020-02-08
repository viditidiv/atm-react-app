import _ from 'lodash';
import axios from 'axios';

import { ADD_TRANSACTIONS, CHECK_BALANCE, DEPOSIT, RECEIVE_DATA, RECEIVE_DONE,
	RECEIVE_ERROR, UPDATE_BALANCE, WITHDRAW } from './action_types';
import STATUS from './status_codes';

/*
 * Action for RECEIVE_DATA
 * @returns {Object}
 */
const receiveData = () => {
	return {
		type: RECEIVE_DATA
	};
};

/*
 * Action for RECEIVE_DONE
 * @param {String} message
 * @returns {Object}
 */
const receiveDone = (message = '') => {
	return {
		type: RECEIVE_DONE,
		message: message
	};
};

/*
 * Action for RECEIVE_ERROR
 * @param {String} message
 * @returns {Object}
 */
const receiveError = (message = '') => {
	return {
		type: RECEIVE_ERROR,
		message: message
	};
};

/*
 * Action for DEPOSIT
 * @param {Number} amount
 * @param {Number} balance
 * @returns {Object}
 */
const depositAmount = (amount, balance) => {
	return {
		type: DEPOSIT,
		amount: amount,
		// status: true,
		balance: balance,
		text: 'Deposit'
	};
};

/*
 * Action for WITHDRAW
 * @param {Number} amount
 * @param {Number} balance
 * @returns {Object}
 */
const withdrawAmount = (amount, balance) => {
	return {
		type: WITHDRAW,
		amount: amount,
		balance: balance,
		text: 'Withdraw'
	};
};

/*
 * Action for ADD_TRANSACTIONS
 * @param {Array} transactions
 * @returns {Object}
 */
const addTransactions = (transactions = []) => {
	return {
		type: ADD_TRANSACTIONS,
		transactions: transactions
	};
};

/*
 * Action for CHECK_BALANCE
 * @param {Number} amount
 * @param {Number} balance
 * @returns {Object}
 */
const checkBalance = (amount, balance) => {
	return {
		type: CHECK_BALANCE,
		haveEnough: (balance - amount > 0)
	};
};

/*
 * Action for UPDATE_BALANCE
 * @param {Number} balance
 * @returns {Object}
 */
const updateBalance = (balance) => {
	return {
		type: UPDATE_BALANCE,
		balance: balance
	};
};

/*
 * Action for fetching data from the db
 * returns {Promise}
 */
const fetchData = () => {
	return (dispatch) => {
		dispatch(receiveData());
		axios.get('http://localhost:3002/bankAccount')
			.then((res) => {
				dispatch(updateBalance(_.get(res, 'data.balance', 0)));
				dispatch(addTransactions(_.get(res, 'data.transactions', [])));
				dispatch(receiveDone('Data Fetched Successfully'));
			})
			.catch(() => {
				dispatch(receiveError('Data Fetch Failed'));
			});
	};
};

export { addTransactions, checkBalance, depositAmount, fetchData, receiveData, receiveDone,
	receiveError, updateBalance, withdrawAmount };
