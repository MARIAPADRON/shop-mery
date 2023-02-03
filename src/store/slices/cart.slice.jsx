
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import { setProducts } from './products.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart :(state, action) =>{   
            return action.payload
        }

    }
})

export const getPurchasesThunk =()=>dispatch=>{
    dispatch (setIsLoading(true))
    axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart",
     getConfig())
     .then(resp=>dispatch(setProducts(resp.data.data.products)))
     .catch(error=>console.error(error))
     .finally(()=>dispatch(setIsLoading(false)))
}

export const createProductThunk = (products)=>(dispatch)=>{
    dispatch (setIsLoading(true));
    axios
    .post("https://e-commerce-api.academlo.tech/api/v1/cart", 
    products, getConfig())
    .then((resp)=>dispatch(getPurchasesThunk()))
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}



export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;


