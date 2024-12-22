import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCompanyDetails = createAsyncThunk(
  'companyDetails/fetchCompanyDetails',
  async () => {
    const response = await fetch('https://dummyjson.com/companydetails');
    return response.json();
  }
);

const companyDetailsSlice = createSlice({
  name: 'companyDetails',
  initialState: {
    details: null,
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default companyDetailsSlice.reducer;
