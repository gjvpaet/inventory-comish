import {
    SET_PRODUCT,
    FETCH_PRODUCTS,
    MODIFY_PRODUCT,
    SET_SELECTED_PRODUCT
} from './actionTypes';

export const fetchProducts = payload => {
    return {
        payload,
        type: FETCH_PRODUCTS
    };
};

export const setSelectedProduct = payload => {
    return {
        payload,
        type: SET_SELECTED_PRODUCT
    };
};

export const setProduct = payload => {
    return {
        payload,
        type: SET_PRODUCT
    };
};
