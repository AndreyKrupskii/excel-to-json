import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { addFile } from './../../ducks/file';
import { setSearch } from './../../ducks/history';
import './history.css';
import {
	PageHeader,
	FormGroup,
	FormControl,
	InputGroup,
	Glyphicon,
	Panel
} from 'react-bootstrap';

/**
 * Component - history component
 */
class History extends Component {
	/**
	 * Method for rendering component layout
	 * @return {XML}
	 */
	render() {
		return (
			<section className="history">
				<PageHeader>
					Excel to JSON
				</PageHeader>
				<FormGroup>
					<InputGroup>
						<FormControl
							type="text"
							value={this.props.search || ''}
							onChange={(e) => this.props.setSearch(e.target.value)}
						  placeholder="Search history..."
						/>
						
						<InputGroup.Addon>
							<Glyphicon
								glyph="search"
							/>
						</InputGroup.Addon>
						
					</InputGroup>
					
				</FormGroup>
				
				<div className="history__files">
					{this.props.files.map((v) => {
						const isOpened = (v.id === this.props.openedFileId);
						
						return (
							<Panel
								key={v.uploadedAt}
								className={isOpened ? 'opened' : 'not-opened'}
							  onClick={this.props.viewFile.bind(this, v)}
							>
								<span className="bold">File name:</span> {v.name}
							</Panel>
						)
					})}
				</div>
			</section>
		)
	}
}

/**
 * Decorator - map state to props
 * @param {object} state - app store state
 * @return {object}
 */
function mapStateToProps(state) {
	// filtered files selector
	const selectFiles = createSelector(
		(state) => state.history.files,
		(state) => state.history.search,
		(files, search) => {
			return files
				.filter((v) => {
					return ~(v.name.indexOf(search));
				})
				.map((v) => {
					return {
						...v,
						id: `${v.name}-${v.uploadedAt}`
					}
				})
		}
	);
	
	// opened file id selector
	const selectOpenedFileId = createSelector(
		(state) => state.file,
		(file) => `${file.name}-${file.uploadedAt}`
	);
	
	return {
		files: selectFiles(state),
		search: state.history.search,
		openedFileId: selectOpenedFileId(state)
	}
}

/**
 * Decorator - map dispatch to props
 * @param dispatch - redux store dispatch
 * @return {object}
 */
function mapDispatchToProps(dispatch) {
	return {
		viewFile: bindActionCreators(addFile, dispatch),
		setSearch: bindActionCreators(setSearch, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);