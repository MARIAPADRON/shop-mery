import { createSlice } from '@reduxjs/toolkit';

export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases :(state, action) =>{   
        return action.payload
    }}
})

export const { setPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
