import {
    SET_PRODUCT,
    ADD_PRODUCT,
    FETCH_PRODUCTS,
    UPDATE_PRODUCT,
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

export const addProduct = payload => {
    return {
        payload,
        type: ADD_PRODUCT
    };
};

export const updateProduct = payload => {
    return {
        payload,
        type: UPDATE_PRODUCT
    };
};
