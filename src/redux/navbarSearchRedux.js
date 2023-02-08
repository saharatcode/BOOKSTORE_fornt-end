import {createSlice} from '@reduxjs/toolkit';

const navBarSlice = createSlice({
    name:"keyword",
    initialState:{
        keyword:"",

    },
    reducers:{
        searchKeyword :(state, action)=>{
            state.keyword = action.payload
        },
    },
});

export const { searchKeyword } = navBarSlice.actions;
export default navBarSlice.reducer;