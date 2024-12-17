import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: [],
    },
    reducers: {
        addToCart(state, action) {
            const itemInCart = state.data.find((item) => item.id === action.payload.id);
           
            if (itemInCart) {
                itemInCart.quantity += 1;
                message.warning("Item already in cart");
                return;
            }
            state.data.push(action.payload);
            message.success("Item added to cart");
        },
        removeFromCart(state, action) {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        descrementQnty(state, action) {
            const itemInCart = state.data.find((item) => item.id === action.payload);
            if (itemInCart && itemInCart.quantity > 1) {
                itemInCart.quantity -= 1;
            } else {
                message.warning("Quantity cannot be less than 1");
            }
        },
        incrementQnty(state, action) {
            const itemInCart = state.data.find((item) => item.id === action.payload);
            if (itemInCart) {
                itemInCart.quantity += 1;
            }
        },
        clearCart(state) {
            state.data = [];
        }
    },
});

export const { addToCart, removeFromCart, descrementQnty, incrementQnty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;