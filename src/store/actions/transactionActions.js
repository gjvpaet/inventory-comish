import { FETCH_TRANSACTIONS } from './actionTypes';

export const fetchTransactions = payload => {
    return {
        payload,
        type: FETCH_TRANSACTIONS
    };
};
