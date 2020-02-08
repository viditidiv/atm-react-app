import React, { Component } from 'react';
import { connect } from 'react-redux';

import STATUS from '../actions/status_codes';

/*
 * Status Display component
 */
class StatusDisplay extends Component {
	/*
	 * Constructor
	 * @constructor
	 * @param {Object} props
	 */
	constructor(props) {
		super(props);
	}
	/*
	 * Chooses the class name of the alert div based on the status
	 * @param {Object} status
	 * @param {Number} status.status
	 * @returns {String} class name
	 */
	chooseClassName(status) {
		const statusNum = _.get(status, 'status', null);
		switch(statusNum) {
			case STATUS.ERROR:
				return 'alert-danger';
			case STATUS.LOADING:
				return 'alert-info';
			case STATUS.DONE_LOADING:
				return 'alert-success';
			default:
				return '';
		};
	}
	/*
	 * Renders the component
	 * @returns {Object} React element
	 */
	render() {
		const { status } = this.props;
		return (
			<div className={'alert ' + this.chooseClassName(status)} role="alert">{_.get(status, 'message', '')}</div>
		);
	}
};

StatusDisplay.propTypes = {
	status: React.PropTypes.shape({
		status: React.PropTypes.number,
		message: React.PropTypes.string
	}).isRequired
};

/*
 * Picks individual required state data for the Status Display component
 * @param {Object} state
 * @returns {Object} map of needed state data
 */
const mapStateToProps = (state) => {
	return {
		status: state.status
	};
};

export default connect(mapStateToProps)(StatusDisplay);
