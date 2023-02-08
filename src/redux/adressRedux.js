import { createSlice } from "@reduxjs/toolkit";

const adressSlice = createSlice({
    name: "adress",
    initialState: {
        isFetching: false,
        adress: null,
        error: false,
    },
    reducers: {
        getAdressStart: (state) => {
            state.isFetching = true;
        },
        //action รับ res.data
        getAdressSuccess: (state, action) => {
            state.isFetching = false;
            state.adress = action.payload;
        },
        getAdressFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        postAdressStart: (state) => {
            state.isFetching = true;
        },
        //action รับ res.data
        postAdressSuccess: (state, action) => {
            state.isFetching = false;
            state.adress.push(action.payload)
        },
        postAdressFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deleteAdressStart: (state) => {
            state.isFetching = true;
        },
        //action.playload คือ id ที่เราส่งมา
        deleteAdressSuccess: (state, action) => {
            state.isFetching = false;
            state.adress.splice(
                state.adress.findIndex((item) => item._id === action.payload),1)
        },
        deleteAdressFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updateAdressStart: (state) => {
            state.isFetching = true;
        },
        //action.playload คือ res.data ที่เราส่งมา
        updateAdressSuccess: (state, action) => {
            state.isFetching = false;
            state.adress[
                state.adress.findIndex((item) => item._id === action.payload._id)
            ] = action.payload;
        },
        updateAdressFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        clearAdress: (state) => {
            state.adress = null;
        },
        

    },
});

export const {
    getAdressStart, getAdressSuccess, getAdressFailure,
    postAdressStart, postAdressSuccess, postAdressFailure,
    deleteAdressStart, deleteAdressSuccess, deleteAdressFailure,
    updateAdressStart, updateAdressSuccess, updateAdressFailure,
    clearAdress
} = adressSlice.actions;
export default adressSlice.reducer;