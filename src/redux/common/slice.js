/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice( {
  name: 'common',
  initialState: {
    ifLoading: false,
  },
  reducers: {
    setLoading: ( state, { payload } ) => {
      state.ifLoading = payload;
    },
  },

} );

export const { setLoading, setError } = commonSlice.actions;

export default commonSlice.reducer;
