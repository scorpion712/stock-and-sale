import { FETCH_CASH } from "../types";

export const fetchCash = () => async (dispatch) =>  {
    const res =await fetch("/api/cash");
    const data =await res.json(); 
    dispatch({
        type: FETCH_CASH,
        payload: data
    });
}