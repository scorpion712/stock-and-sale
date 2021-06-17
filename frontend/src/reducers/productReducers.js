const {FETCH_PRODUCTS, DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT} = require("../types.js");

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: 
            return {
                items: action.payload
            };
        case DELETE_PRODUCT:
            return {
                items: action.payload
            };
        case CREATE_PRODUCT: 
            return { 
                items: action.payload
            };
        case EDIT_PRODUCT:
            return {
                items: action.payload
            }
        default: return state;
    }
};