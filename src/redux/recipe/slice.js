/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice( {
  name: 'recipe',
  initialState: {
    allRecipes: null,
    recipeById: null,
  },
  reducers: {
    setAllRecipes: ( state, { payload } ) => {
      state.allRecipes = payload;
    },
    setById: ( state, { payload } ) => {
      state.recipeById = payload;
    },
  },
} );

export const { setAllRecipes, setById } = recipeSlice.actions;
export default recipeSlice.reducer;
