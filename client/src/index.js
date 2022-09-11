import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import HttpsRedirect from 'react-https-redirect';
import { reducers } from './Components/reducers';
import axios from 'axios';
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));





if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // development build code
  console.log("dev")
  axios.defaults.baseURL = 'http://localhost:5000';

} else {
  // production build code
  console.log("production")
  axios.defaults.baseURL = 'https://www.fttt-competition.com';
}

axios.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(
  <Provider store={store}>

    <React.StrictMode>
      <HttpsRedirect>
        <Router>
          <App />
        </Router>
      </HttpsRedirect>
    </React.StrictMode>,
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();
// reportWebVitals();
