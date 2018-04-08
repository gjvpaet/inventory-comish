import { keyBy } from 'lodash';

import { FETCH_TRANSACTIONS } from '../actions/actionTypes';

let initialState = {
    data: {},
    fetchLoading: false
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            return { ...state, data: keyBy(action.payload, 'Id') };
            break;
        default:
            return state;
            break;
    }
};

export default transactionReducer;
