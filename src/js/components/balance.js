import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
 * Balance component
 */
class Balance extends Component {
	/*
	 * Renders the component
	 * @returns {Object} React element
	 */
	render() {
		const { balance } = this.props;
		return (
			<div>
			<h3>Balance: Rs.{this.props.balance}</h3>
			</div>
		);
	}
};

Balance.propTypes = {
	balance: React.PropTypes.number.isRequired
};

/*
 * Picks individual required state data for the Balance component
 * @param {Object} state
 * @returns {Object} map of needed state data
 */
const mapStateToProps = (state) => {
	return {
		balance: state.balance
	};
};

export default connect(mapStateToProps)(Balance);
