import React, { Component } from 'react';
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
export default class History extends Component {
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
					<Panel
					>
						Read
					</Panel>
				</div>
			</section>
		)
	}
}