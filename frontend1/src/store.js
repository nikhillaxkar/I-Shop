import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './reducers/cart';
import UserReducer from './reducers/user';
import AdminReducer from "./reducers/admin";

const store = configureStore({
    reducer: {
        cart: CartReducer,
        user: UserReducer,
        admin:AdminReducer,
    }
});

export default store;
