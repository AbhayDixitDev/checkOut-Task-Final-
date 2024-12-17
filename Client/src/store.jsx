import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reduxSlices/cartSlice";

const store = configureStore({
    reducer:{
        cart: cartReducer
    }
})

export default store
