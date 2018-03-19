import { keyBy } from 'lodash';

import { FETCH_PRODUCTS } from '../actions/actionTypes';

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
            return { ...state, data: keyBy(action.payload, 'Id'), fetchLoading: false };
            break;
        default:
            return state;
            break;
    }
};

export default productReducer;