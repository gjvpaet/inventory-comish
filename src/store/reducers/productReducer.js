import { keyBy } from 'lodash';

import {
    SET_PRODUCT,
    FETCH_PRODUCTS,
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
