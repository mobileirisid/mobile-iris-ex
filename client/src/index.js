import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import App from './containers/App';
import configureStore from './redux/store';
import './index.css';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
