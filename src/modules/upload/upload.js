import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadFile } from './../../ducks/file';
import './upload.css';
import {
	FormGroup,
	InputGroup,
	FormControl
} from 'react-bootstrap';

/**
 * Component - upload component
 */
class Upload extends Component {
	/**
	 * Method for handling file upload
	 * @param {object} e - event instance
	 */
	handleChange(e) {
		const fileList = e.target.files;
		const file = fileList[0];
		
		if(file) {
			this.props.uploadFile(file);
		}
	}
	
	/**
	 * Method for rendering component layout
	 * @return {XML}
	 */
	render() {
		return (
			<div className="upload">
				<FormGroup>
					<InputGroup>
						<input
							onChange={this.handleChange.bind(this)}
							id="upload-input"
							type="file"
							accept=".xls,.xlsx"
						/>
						
						<FormControl
							type="text"
						  placeholder="Upload file..."
						  onClick={() => {
						  	this.refs.button.click();
						  }}
						/>
						
						<InputGroup.Button>
							<label
								htmlFor="upload-input"
								className="btn btn-default"
							  ref="button"
							>
								Upload
							</label>
						</InputGroup.Button>
						
					</InputGroup>
				</FormGroup>
			</div>
		)
	}
}

/**
 * Decorator - map state to props
 * @return {object}
 */
function mapStateToProps() {
	return {	};
}

/**
 * Decorator - map dispatch to props
 * @param {function} dispatch - store dispatcher
 * @return {object}
 */
function mapDispatchToProps(dispatch) {
	return {
		uploadFile: bindActionCreators(uploadFile, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Upload);