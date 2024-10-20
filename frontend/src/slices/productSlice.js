// import required modules
import {createSlice} from '@reduxjs/toolkit'

// products slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: null
    },
    reducers: {

    }
});

// assign actions and reducer
const {actions, reducer} = productSlice;

// export action
export const {} = actions;

// export reducer
export default reducer;