import React, { Component } from 'react';
import History from './../history/history';
import Upload from './../upload/upload';
import File from './../file/file';
import './app.css';
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

/**
 * Component - app component
 */
class App extends Component {
	/**
	 * Method for rendering component layout
	 * @return {XML}
	 */
  render() {
    return (
	    <section className="app">
		    <Grid>
			    <Row>
				    <Col xs={12} sm={6} md={4} >
					    <History/>
				    </Col>
				    <Col xs={12} sm={6} md={8}>
					    <Upload/>
					    <File/>
				    </Col>
			    </Row>
		    </Grid>
	    </section>
    );
  }
}

export default App;
