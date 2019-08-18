import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Reducers from './reducers/reducer.js';
import Sagas from './saga/saga.js';

import GetAsyncData from './components/getAsyncData.js';
import UserDetail from './components/userDetail.js';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	Reducers,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Sagas);

ReactDOM.render(
	<Provider store={ store } >
		<Router>
			<Route path="/" component={ GetAsyncData } />		
		</Router>
	</Provider>,
	document.getElementById('root')
);
