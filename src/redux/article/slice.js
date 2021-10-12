/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice( {
  name: 'article',
  initialState: {
    allArticles: null,
    articleById: null,
  },
  reducers: {
    setAllArticles: ( state, { payload } ) => {
      state.allArticles = payload;
    },
    setArticleById: ( state, { payload } ) => {
      state.recipeById = payload;
    },
    cleanStoreArticles: ( state ) => {
      state.allRecipes = null;
    },
  },
} );

export const { setAllArticles, setArticleById, cleanStoreArticles } = articleSlice.actions;

export default articleSlice.reducer;
