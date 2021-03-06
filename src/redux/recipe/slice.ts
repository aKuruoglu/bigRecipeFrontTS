/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAllRecipe, IRecipe } from './interface';

interface InitialState {
  allRecipes: IAllRecipe | null,
  recipeById: IRecipe | null,
  requestStatus: string,
}

const initialState: InitialState = {
  allRecipes: null,
  recipeById: null,
  requestStatus: '',
};

export const recipeSlice = createSlice( {
  name: 'recipe',
  initialState,
  reducers: {
    setAllRecipes: ( state, { payload }: PayloadAction<IAllRecipe | null> ) => {
      state.allRecipes = payload;
    },
    setRecipeById: ( state, { payload }: PayloadAction<IRecipe | null> ) => {
      state.recipeById = payload;
    },
    changeRequestStatus: ( state, { payload }: PayloadAction<string> ) => {
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
