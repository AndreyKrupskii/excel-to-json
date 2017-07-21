import React, { Component } from 'react';
import './file.css';

/**
 * Component - file component
 */
export default class File extends Component {
	/**
	 * Method for rendering component layout
	 * @return {XML}
	 */
	render() {
		return (
			<div className="file">
				
				<pre>
{`{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`}
				</pre>
			</div>
		)
	}
}