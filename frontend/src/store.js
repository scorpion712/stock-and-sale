import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import {productReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import thunk from "redux-thunk";
import { clientReducer } from './reducers/clientReducers'; 
import { providerReducer } from './reducers/providerReducer';
import {orderReducer} from './reducers/orderReducers';
import { cashReducer } from './reducers/cashReducers';
 
const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(combineReducers({
    products: productReducer,
    cart: cartReducer,
    client: clientReducer,
    providers: providerReducer,
    order: orderReducer,
    cash: cashReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;