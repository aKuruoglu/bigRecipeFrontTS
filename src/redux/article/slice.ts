/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAllArticles, IArticle } from './interface';

interface ArticleState {
  allArticles: IAllArticles | null,
  articleById: IArticle | null,
  requestStatus: string,
}

const initialState: ArticleState = {
  allArticles: null,
  articleById: null,
  requestStatus: '',
};

export const articleSlice = createSlice( {
  name: 'article',
  initialState,
  reducers: {
    setAllArticles: ( state, { payload }: PayloadAction<IAllArticles> ) => {
      state.allArticles = payload;
    },
    setArticleById: ( state, { payload }: PayloadAction<IArticle | null> ) => {
      state.articleById = payload;
    },
    changeRequestStatus: ( state, { payload }: PayloadAction<string> ) => {
      state.requestStatus = payload;
    },
    cleanStoreArticles: ( state ) => {
      state.allArticles = null;
    },
  },
} );

export const { setAllArticles, setArticleById, changeRequestStatus } = articleSlice.actions;

export default articleSlice.reducer;
