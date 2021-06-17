import {ADD_TO_CART, REMOVE_FROM_CART} from '../types';

export const addToCart = (product, product_count) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let exists = false;
    if (product_count > 0) {
        cartItems.forEach((x) => {
            if (x.product_code === product.product_code) {
                exists = true;
                x.count= Number(x.count) + Number(product_count); //add 1 unit to the item
            }
        });
        if (!exists) {
            cartItems.push({...product, count: product_count});
        }
    } 
    dispatch({
        type: ADD_TO_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCartId = (product) => (dispatch, getState) => { 
    const cartItems = getState().cart.cartItems.slice()
        .filter((x) => x.product_code !== product.product_code); 
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (product) => (dispatch, getState) => {  
    let cartItems = getState().cart.cartItems.slice();
    let toDelete = -1;
    cartItems.forEach((p) => {
        if (p.product_code === product.product_code) { 
            if (Number(p.count) - 1 <= 0) {  
                toDelete = cartItems.indexOf(p);
            }  
            p.count = Number(p.count-1);
        }
    });  
    if (toDelete >= 0) {  
        cartItems.splice(toDelete,1); 
    }
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}