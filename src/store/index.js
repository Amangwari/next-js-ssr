import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import productsReducer from './productslice'; // Assuming your product slice is in 'productslice'
import productDetailsReducer from './productdetailslice'; // Assuming your product slice is in 'productslice'
import currecyReducer from './currencySlice'; // Assuming your product slice is in 'productslice'
import companyDetailReducer from './companyDetailsSlice'; // Assuming your product slice is in 'productslice'

const combinedReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  currency: currecyReducer,
  companyDetails: companyDetailReducer,
  // Add any other reducers here
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    // Merge the server-side state with the client-side state
    const nextState = {
      ...state, // Keep the current state
      ...action.payload, // Apply the payload from the server-side state (hydration)
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => configureStore({ reducer });

export const wrapper = createWrapper(makeStore, { debug: true });
