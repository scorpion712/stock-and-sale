import { CLEAR_CART, CREATE_ORDER, FETCH_SALES, FETCH_SALE_DETAILS, FETCH_ACCOUNTS, PAY_OFF} from "../types";

export const fetchSales = () => async (dispatch) => { 
    const res = await fetch("/api/orders");
    const data = await res.json();
    dispatch ( {
        type: FETCH_SALES,
        payload: data
    }) 
}; 

export const fetchSaleDetails = (sale_id, type) => async (dispatch) => {
    let res = await fetch("/api/orders/"+sale_id);
    const detail_data = await res.json(); 
    switch (type) {
        case "account":
            res = await fetch("/api/accounts/");
            break;
        default:
            res = await fetch("/api/orders/");
            break;
    }
    const data = await res.json();
    dispatch ({
        type: FETCH_SALE_DETAILS,
        orders: detail_data,
        payload: data
    })
}

export const fetchAccounts = () => async (dispatch) => {
    const res = await fetch("api/accounts");
    const data = await res.json();
    dispatch ({
        type: FETCH_ACCOUNTS,
        payload: data
    })
}

export const payOff = (payoff) => async (dispatch) => { 
    fetch("/api/accounts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(payoff)
    })
    .then((res)=>res.json());
    const res = await fetch("api/accounts");
    const data = await res.json();
    dispatch({
            type: PAY_OFF,
            payload: data
    });
}

export const createNewOrder = (order) => async (dispatch) => {
    fetch("/api/orders", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(order),
    })
    .then((res)=>res.json())
    .then((data)=> {
        dispatch({
            type:CREATE_ORDER, 
            payload: data
        });
        localStorage.clear("cartItems");
        dispatch({ type:CLEAR_CART });
    }); 
};