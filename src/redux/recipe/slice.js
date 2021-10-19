/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice( {
  name: 'recipe',
  initialState: {
    allRecipes: null,
    recipeById: null,
    requestStatus: null,
  },
  reducers: {
    setAllRecipes: ( state, { payload } ) => {
      state.allRecipes = payload;
    },
    setRecipeById: ( state, { payload } ) => {
      state.recipeById = payload;
    },
    changeRequestStatus: ( state, { payload } ) => {
      state.requestStatus = payload;
    },
    cleanStoreRecipes: ( state ) => {
      state.allRecipes = null;
    },
  },
} );

export const {
  setAllRecipes, setRecipeById, cleanStoreRecipes, changeRequestStatus,
} = recipeSlice.actions;
export default recipeSlice.reducer;
