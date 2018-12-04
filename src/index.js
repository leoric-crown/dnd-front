import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './app/containers/App';
import store from './app/store'
require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
