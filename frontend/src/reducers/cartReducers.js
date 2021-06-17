const {ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART} = require ('../types'); 

export const cartReducer = (state = {cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {cartItems: action.payload.cartItems};
        case REMOVE_FROM_CART:
            return {cartItems: action.payload.cartItems};
        case CLEAR_CART:
            return  {cartItems: JSON.parse("[]")};
        default: return state;
    }
}