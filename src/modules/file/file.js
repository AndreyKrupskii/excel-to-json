import React, { Component } from 'react';
import { connect } from 'react-redux';
import './file.css';

/**
 * Component - file component
 */
class File extends Component {
	/**
	 * Method for rendering component layout
	 * @return {XML}
	 */
	render() {
		return (
			<div className="file">
				<pre>
					{this.props.file && this.props.file.json}
				</pre>
			</div>
		)
	}
}

/**
 * Decorator - map state to props
 * @param {object} state - app store state
 * @return {object}
 */
function mapStateToProps(state) {
	return {
		file: state.file
	};
}

export default connect(mapStateToProps)(File);