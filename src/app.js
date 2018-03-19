import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import configureStore from './store/configureStore';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware);

import Dashboard from './pages/Dashboard';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
