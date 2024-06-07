import { createSlice } from "@reduxjs/toolkit";

const initialState={
bannerData:[],
imageUrl:''
}
export const movieslice=createSlice({
    name:'movie',
    initialState,
    reducers:{
    setbannerData :(state,action)=>{
    state.bannerData=action.payload
    },
    setimageUrl:(state,action)=>{
        state.imageUrl=action.payload
    }
    }
})

export const {setbannerData,setimageUrl}=movieslice.actions;
export default movieslice.reducer;