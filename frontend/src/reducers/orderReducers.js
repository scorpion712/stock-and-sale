const {CREATE_ORDER, FETCH_SALES, FETCH_SALE_DETAILS, FETCH_ACCOUNTS, PAY_OFF} = require("../types.js");

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER: 
            return {
                order: action.payload
            }; 
        case FETCH_SALES:
            return {
                order: action.payload
            };
        case FETCH_SALE_DETAILS:
            return { 
                orders: action.orders,
                order: action.payload
            };
        case FETCH_ACCOUNTS:
            return {
                order: action.payload
            }
        case PAY_OFF:
            return {
                order: action.payload
            }
        default: return state;
    }
};