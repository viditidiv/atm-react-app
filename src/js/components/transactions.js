import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { depositAmount, receiveDone, receiveError, updateBalance,
	withdrawAmount } from '../actions/';

/*
 * Transactions component
 */
class Transactions extends Component {
	/*
	 * Constructor
	 * @constructor
	 * @param {Object} props
	 */
	constructor(props) {
		super(props);
		this.deposit = this.deposit.bind(this);
		this.withdraw = this.withdraw.bind(this);
	}
	/*
	 * Gets the numeric value entered in the amount text input
	 * @returns {Number}
	 */
	getAmountValue() {
		return Number(this.refs.amount.value);
	}
	/*
	 * Deposits amount from the text input. It validates the value inputted.
	 */
	deposit() {
		const amount = this.getAmountValue();
		const balance = this.props.balance + amount;

		const errorMsg = this.getErrorMessage(amount, balance);
		if(errorMsg) {
			this.props.receiveError(errorMsg);
			return;
		}

		this.props.deposit(amount, balance);
		this.props.updateBalance(balance);
		this.props.receiveDone('Deposit of Rs.' + amount + ' successful');
	}
	/*
	 * Withdraws amount from the text input. It validates the value inputted
	 * and ensures there is enough in the balance.
	 */
	withdraw() {
		const amount = this.getAmountValue();
		const withdrawAmount = amount * -1;
		let balance = this.props.balance + withdrawAmount;

		const errorMsg = this.getErrorMessage(withdrawAmount, balance, true);
		if(errorMsg) {
			this.props.receiveError(errorMsg);
			return;
		}

		this.props.withdraw(withdrawAmount, balance);
		this.props.updateBalance(balance);
		this.props.receiveDone('Withdrawl of Rs.' + amount + ' successful');
	}
	/*
	 * Error handling for the value inputted in the text input
	 * @param {Number}  amount
	 * @param {Number}  balance
	 * @param {Boolean} isWithdrawal
	 * @returns {String} error message
	 */
	getErrorMessage(amount, balance, isWithdrawal=false) {
		if(Number.isNaN(amount)) {
			return 'Amount is not an actual number';
		}

		if((isWithdrawal && amount >= 0) ||
			(!isWithdrawal && amount <=0 )) {
			return 'Amount must be greater than 0';
		}

		if(isWithdrawal && balance < 0) {
			return 'Your withdrawal amount exceeds the balance in your account.';
		}
		if(amount<=-20000 && isWithdrawal){
			return 'Maximum limit of 20000 is exceeded';
		}
		if(amount%100!=0 && isWithdrawal){
			return 'Amount should be multiple of 100, 200, 500 or 2000';
		}

		return;
	}
	/*
	 * Renders the component
	 * @returns {Object} React element
	 */
	render() {
		const { balance, transactions } = this.props;

		return (
			<div>
				<table className='table table-striped table-hover'>
					<thead>
						<tr>
							<th>Date/Time</th>
							<th>Description</th>
							<th className='text-right'>Amount</th>
							<th className='text-right'>Balance</th>
						</tr>
					</thead>
					<tbody>
						{this.props.transactions.map((transaction, index) => {
							return (
								<tr key={index} >
									<td>{moment(transaction.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
									<td>{transaction.text}</td>
									<td className={(transaction.amount >= 0 ? 'number' : 'number negative') + ' text-right'} >Rs. {transaction.amount}</td>
									<td className='text-right' >Rs. {transaction.balance}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<input ref="amount" />
				<button onClick={this.withdraw} >Withdraw</button>
				<button onClick={this.deposit} >Deposit</button>
			</div>
		);
	}
};

Transactions.propTypes = {
	balance: React.PropTypes.number.isRequired,
	deposit: React.PropTypes.func.isRequired,
	receiveDone: React.PropTypes.func.isRequired,
	receiveError: React.PropTypes.func.isRequired,
	status: React.PropTypes.object.isRequired,
	transactions: React.PropTypes.array.isRequired,
	updateBalance: React.PropTypes.func.isRequired,
	withdraw: React.PropTypes.func.isRequired
};

/*
 * Picks individual required state data for the Transactions component
 * @param {Object} state
 * @returns {Object} map of needed state data
 */
const mapStateToProps = (state) => {
	return {
		balance: state.balance,
		status: state.status,
		transactions: state.transactions
	};
};

/*
 * Picks individual required dispatch of actions for the Transactions component
 * @param {Object} dispatch
 * @returns {Object} map of dispatches
 */
const mapDispatchToProps = (dispatch) => {
	return {
		deposit: (amount, balance) => {
			dispatch(depositAmount(amount, balance));
		},
		receiveDone: (message) => {
			dispatch(receiveDone(message));
		},
		receiveError: (message) => {
			dispatch(receiveError(message));
		},
		updateBalance: (balance) => {
			dispatch(updateBalance(balance));
		},
		withdraw: (amount, balance) => {
			dispatch(withdrawAmount(amount, balance));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
