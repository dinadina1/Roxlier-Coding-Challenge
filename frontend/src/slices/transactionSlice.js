// import required modules
import {createSlice} from '@reduxjs/toolkit'

// products slice
const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: false,
        transactions: null,
        count: 0,
        error: null,
        statistics: null,
        barchart: null,
        piechart: null
    },
    reducers: {
        getTransactionsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        getTransactionsSuccess(state, action){
            return {
                ...state,
                loading: false,
                transactions: action.payload.products,
                count: action.payload.count
            }
        },
        getTransactionsFail(state, action){
            return {
                ...state, 
                loading: false,
                error: action.payload
            }
        },
        getStatisticsRequest(state, action){
            return {
                ...state,
                loading: true                
            }
        },
        getStatisticsSuccess(state, action){
            return {
                ...state,
                loading: false,
                statistics: action.payload.statistics,
                barchart: action.payload.barchart,
                piechart: action.payload.piechart
            }
        },
        getStatisticsFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearErrors(state, action){
            return {
                ...state,
                error: null
            }
        }
        
    }
});

// assign actions and reducer
const {actions, reducer} = transactionSlice;

// export action
export const {
    getTransactionsFail,
    getTransactionsRequest,
    getTransactionsSuccess,
    getStatisticsFail,
    getStatisticsRequest,
    getStatisticsSuccess,
    clearErrors
} = actions;

// export reducer
export default reducer;