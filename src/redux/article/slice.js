/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice( {
  name: 'article',
  initialState: {
    allArticles: null,
    articleById: null,
    requestStatus: null,
  },
  reducers: {
    setAllArticles: ( state, { payload } ) => {
      state.allArticles = payload;
    },
    setArticleById: ( state, { payload } ) => {
      state.articleById = payload;
    },
    changeRequestStatus: ( state, { payload } ) => {
      state.requestStatus = payload;
    },
    cleanStoreArticles: ( state ) => {
      state.allArticles = null;
    },
  },
} );

export const { setAllArticles, setArticleById, changeRequestStatus } = articleSlice.actions;

export default articleSlice.reducer;
