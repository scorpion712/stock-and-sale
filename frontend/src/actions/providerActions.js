import { CREATE_PROVIDER, FETCH_PROVIDERS, EDIT_PROVIDER, DELETE_PROVIDER, INCREASE_PROVIDER } from "../types";

export const fetchProviders = () => async (dispatch) => {
    const res = await fetch("/api/providers");
    const data = await res.json();
    dispatch ( {
        type: FETCH_PROVIDERS,
        payload: data
    })
}; 

export const createNewProvider = (provider) => async (dispatch) => { 
    fetch("/api/providers", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(provider),
    })
    .then((res)=>res.json());
    const res = await fetch("/api/providers");
    const data = await res.json(); 
    dispatch({
        type: CREATE_PROVIDER,
        payload: data
    }); 
};

export const editProvider = (provider) => async (dispatch) => {
    fetch("/api/providers/"+provider.provider_id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(provider)
    }).then((res) => res.json());
    const res = await fetch("/api/providers");
    const data = await res.json();
    dispatch({
        type: EDIT_PROVIDER,
        payload: data
    })
}
 
export const deleteProvider = (provider_id) => async (dispatch) => {
    let res = await fetch("/api/providers/"+provider_id, {
        method: "DELETE"
    });
    res = await fetch("/api/providers");
    const data = await res.json();
    dispatch({
        type: DELETE_PROVIDER,
        payload: data
    });
};

export const increaseProvider = (provider_id, inc_percent) => async (dispatch) => {
    fetch("/api/providers/increase/"+provider_id, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({inc_percent: inc_percent}),
    })
    .then((res)=>res.json());
    const res = await fetch("/api/providers");
    const data = await res.json(); 
    dispatch({
        type:INCREASE_PROVIDER, 
        payload: data
    });
    
}