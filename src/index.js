import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import RootReducer from './store/Reducers/RootReducer'
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'
import "@ionic/pwa-elements";
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // add this line

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const store = createStore(RootReducer, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><Home /></Provider>, document.getElementById('root'));

//ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
defineCustomElements(window);
