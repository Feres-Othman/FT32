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

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));



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
