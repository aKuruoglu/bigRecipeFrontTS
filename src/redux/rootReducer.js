import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import recipeReducer from './recipe/slice';

export const rootReducer = combineReducers( {
  category: categoryReducer,
  recipe: recipeReducer,
} );
