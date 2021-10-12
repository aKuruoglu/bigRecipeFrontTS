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
    setRecipeById: ( state, { payload } ) => {
      state.recipeById = payload;
    },
    cleanStoreRecipes: ( state ) => {
      state.allRecipes = null;
    },
  },
} );

export const { setAllRecipes, setRecipeById, cleanStoreRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
