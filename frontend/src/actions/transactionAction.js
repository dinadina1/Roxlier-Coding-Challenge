// import required modules
import axios from "axios";
import {
  getStatisticsFail,
  getStatisticsRequest,
  getStatisticsSuccess,
  getTransactionFail,
  getTransactionRequest,
  getTransactionsFail,
  getTransactionsRequest,
  getTransactionsSuccess,
  getTransactionSuccess,
} from "../slices/transactionSlice";

const API_URL = "http://3.89.158.138:3500";

// get products transactions
export const getProducts = (page, month, search) => async (dispatch) => {
  try {
    dispatch(getTransactionsRequest());

    // Construct the API URL
    let api = `${API_URL}/api/v1/transactions?page=${page}`;

    // Add month and search parameters if they exist
    if (month) {
      api += `&month=${month}`;
    }
    if (search) {
      api += `&search=${search}`;
    }

    // Make the API call
    const { data } = await axios.get(api);

    // Dispatch success action with products data
    dispatch(getTransactionsSuccess(data));
  } catch (error) {
    // Dispatch fail action with error message
    dispatch(
      getTransactionsFail(error?.response?.data?.message || "An error occurred")
    );
  }
};

// get statistics
export const getStatistics = (month) => async (dispatch) => {
  try {
    dispatch(getStatisticsRequest());

    // Make the API call
    const { data } = await axios.get(
      `${API_URL}/api/v1/productInfo?month=${month}`
    );

    // Dispatch success action with products data
    dispatch(getStatisticsSuccess(data));
  } catch (error) {
    // Dispatch fail action with error message
    dispatch(
      getStatisticsFail(error?.response?.data?.message || "An error occurred")
    );
  }
};

// get particular transaction
export const getTransaction = (id) => async (dispatch) => {
  try {
    dispatch(getTransactionRequest());

    // Make the API call
    const { data } = await axios.get(`${API_URL}/api/v1/transaction/${id}`);

    // Dispatch success action with products data
    dispatch(getTransactionSuccess(data?.transaction));
  } catch (error) {
    // Dispatch fail action with error message
    dispatch(
      getTransactionFail(error?.response?.data?.message || "An error occurred")
    );
  }
};
