import {CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FETCH_PRODUCTS} from '../types';

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json(); 
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
}

export const deleteProduct = (product_id) => async (dispatch) => {
    let res = await fetch("/api/products/"+product_id, {
        method: "DELETE"
    });
    res = await fetch("/api/products");
    const data = await res.json(); 
    dispatch({
        type: DELETE_PRODUCT,
        payload: data
    }); 
}

export const editProduct = (product) => async (dispatch) => {
    fetch("/api/products/"+product.product_code, {
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(product),
    })
    .then((res)=>res.json());
    const res = await fetch("/api/products");
    const data = await res.json(); 
    dispatch({
        type: EDIT_PRODUCT,
        payload: data
    }); 
};

export const createNewProduct = (product) => async (dispatch) => {  
    fetch("/api/products", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(product),
    })
    .then((res)=>res.json());
    const res = await fetch("/api/products");
    const data = await res.json(); 
    dispatch({
        type: CREATE_PRODUCT,
        payload: data
    }); 
};
 