import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    products: productReducer
});

const configureStore = middleware => {
    return createStore(rootReducer, applyMiddleware(middleware));
};

export default configureStore;
