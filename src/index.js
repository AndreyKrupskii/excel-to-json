import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './modules/app/app';
import registerServiceWorker from './services/service_worker/register_service_worker';
import './index.css';

// define react-app
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
	document.getElementById('root')
);

// define service worker
registerServiceWorker();