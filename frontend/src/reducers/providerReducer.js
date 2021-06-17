import { CREATE_PROVIDER, EDIT_PROVIDER, FETCH_PROVIDERS, DELETE_PROVIDER, INCREASE_PROVIDER } from "../types";

export const providerReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PROVIDERS:
            return {providers: action.payload};
        case CREATE_PROVIDER:
            return {providers: action.payload};
        case EDIT_PROVIDER:
            return {providers: action.payload};
        case DELETE_PROVIDER:
            return {providers: action.payload};
        case INCREASE_PROVIDER:
            return {providers: action.payload};
        default:
            return state;
    }
}