import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async () => {
    const response = await fetch('https://dummyjson.com/currency');
    return response.json();
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    rate: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rate = action.payload;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default currencySlice.reducer;
