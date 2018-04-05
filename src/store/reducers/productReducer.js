import { keyBy } from 'lodash';

import {
    SET_PRODUCT,
    ADD_PRODUCT,
    FETCH_PRODUCTS,
    UPDATE_PRODUCT,
    SET_SELECTED_PRODUCT
} from '../actions/actionTypes';

let initialState = {
    data: {},
    selected: null,
    formAction: 'POST',
    formLoading: false,
    fetchLoading: true,
    selectedStocks: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                fetchLoading: false,
                data: keyBy(action.payload, 'Id')
            };
            break;
        case SET_PRODUCT:
            return { ...state, ...action.payload };
            break;
        case ADD_PRODUCT:
            return {
                ...state,
                data: { 
                    [action.payload.Id]: action.payload, 
                    ...state.data
                },
                selected: null
            };
            break;
        case UPDATE_PRODUCT:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.Id]: action.payload
                },
                selected: null
            };
            break;
        case SET_SELECTED_PRODUCT:
            let selected = state.selected ? { ...state.selected } : {};

            return {
                ...state,
                selected: {
                    ...selected,
                    [action.payload.field]: action.payload.value
                }
            };
            break;
        default:
            return state;
            break;
    }
};

export default productReducer;
