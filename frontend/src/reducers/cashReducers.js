import { FETCH_CASH } from "../types";

export const cashReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CASH:
            return {cash: action.payload};    
        default:
            return state;
    }
}