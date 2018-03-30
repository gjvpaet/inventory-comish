import { keyBy } from 'lodash';

import { FETCH_PRODUCTS, MODIFY_PRODUCT } from '../actions/actionTypes';

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
        case MODIFY_PRODUCT:
            return { ...state, selected: action.payload };
        default:
            return state;
            break;
    }
};

export default productReducer;
