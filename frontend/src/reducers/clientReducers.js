import { CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT, FETCH_CLIENTS } from "../types";

export const clientReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CLIENT:
            return {clients: action.payload};
        case FETCH_CLIENTS:
            return {clients: action.payload};
        case DELETE_CLIENT:
            return {clients: action.payload}
        case EDIT_CLIENT:
            return {clients: action.payload}
        default:
            return state;
    }
}