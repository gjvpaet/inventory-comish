import { FETCH_PRODUCTS } from './actionTypes';

export const fetchProducts = payload => {
    return {
        type: FETCH_PRODUCTS,
        payload
    };
};
