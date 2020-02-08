import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Balance from '../components/balance';
import StatusDisplay from '../components/status_display';
import Transactions from '../components/transactions';

/*
 * Root component in production mode. It does not display DevTools
 */
export default class Root extends Component {
	/*
	 * Renders the component
	 * @returns {Object} React element
	 */
	render() {
		return (
			<Provider store={store}>
				<div className='container'>
					<div className='page-header'><h1>ATM in Redux-React</h1></div>
					<StatusDisplay />
					<Balance />
					<Transactions />
					<DevTools />
				</div>
			</Provider>
		);
	}
}