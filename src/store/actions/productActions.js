import { FETCH_PRODUCTS, MODIFY_PRODUCT } from './actionTypes';

export const fetchProducts = payload => {
    return {
        payload,
        type: FETCH_PRODUCTS
    };
};

export const modifyProduct = payload => {
    return {
        payload,
        type: MODIFY_PRODUCT
    }
};
