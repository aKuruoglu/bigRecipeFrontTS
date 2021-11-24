/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  ifLoading: boolean;
}

export const commonSlice = createSlice( {
  name: 'common',
  initialState: {
    ifLoading: false,
  } as initialState ,
  reducers: {
    setLoading: ( state, { payload }: PayloadAction<boolean> ) => {
      state.ifLoading = payload;
    },
  },

} );

export const { setLoading } = commonSlice.actions;

export default commonSlice.reducer;
