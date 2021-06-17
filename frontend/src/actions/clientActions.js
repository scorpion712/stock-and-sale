import { CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT, FETCH_CLIENTS } from "../types";

export const createClient = (client) => async (dispatch) => { 
    fetch("/api/clients", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(client)
    })
    .then((res) => res.json());
    const res = await fetch("/api/clients");
    const data = await res.json()
    dispatch({
        type: CREATE_CLIENT,
        payload: data
    });
};

export const fetchClients = () => async (dispatch) => {
    const res =await fetch("/api/clients");
    const data =await res.json(); 
    dispatch({
        type: FETCH_CLIENTS,
        payload: data
    });
}; 

export const editClient = (client) => async (dispatch) => {
    fetch("/api/clients/edit/"+client.client_id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(client)
    })
        .then((res) => res.json());
    const res = await fetch("/api/clients");
    const data = await res.json();
    dispatch({
        type: EDIT_CLIENT,
        payload: data
    });
}; 

export const removeClient = (client_id) => async (dispatch) => {
    let res = await fetch("/api/clients/"+client_id, {
        method: "DELETE"
    });
    res = await fetch("/api/clients");
    const data = await res.json();
    dispatch({
        type: DELETE_CLIENT,
        payload: data
    });
};
 