import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './devtools';

import Balance from '../components/balance';
import StatusDisplay from '../components/status_display';
import Transactions from '../components/transactions';

/*
 * Root element in dev mode. It displays DevTools
 */
export default class Root extends Component {
	/*
	 * Renders the component
	 * @returns {Object} React element
	 */
	render() {
		const { store } = this.props;

		return (
			<Provider store={store}>
				<div className='container'>
					<div className='page-header'><h1>ATM in Redux-React</h1></div>
					<StatusDisplay />
					<Balance />
					<Transactions />
				</div>
			</Provider>
		);
	}
}
