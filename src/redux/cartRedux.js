import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,

    },
    reducers:{
        addToCart:(state, action)=>{
            const item = state.products.find((item) => item._id === action.payload._id)
            if(item){
                item.quantity += action.payload.quantity;
            }else{
                state.products.push(action.payload);
                state.quantity += 1;
            }
            state.total += (Number(action.payload.price).toFixed(2) - (Number(action.payload.price)*(Number(action.payload.discount)/100)).toFixed(2)) * Number(action.payload.quantity)
            // state.total += action.payload.price *action.payload.quantity;
        },
        decreaseProduct:(state, action)=>{
            const item = state.products.find((item) => item._id === action.payload._id)
            if(item){
                item.quantity -= action.payload.quantity;
            }
            state.total -= Number(action.payload.price).toFixed(2) - (Number(action.payload.price)*(Number(action.payload.discount)/100)).toFixed(2)
        },
        deleteProduct:(state, action)=>{
            state.quantity -= 1;
            state.products.splice(state.products.findIndex((item) => item._id === action.payload._id ),1)
            state.total -= (Number(action.payload.price).toFixed(2) - (Number(action.payload.price)*(Number(action.payload.discount)/100)).toFixed(2)) * Number(action.payload.quantity)
        },
        clearCart:(state, action)=>{
            state.products = []
            state.quantity = 0
            state.total = 0
        },

    },
});

export const { addToCart, deleteProduct, clearCart, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;