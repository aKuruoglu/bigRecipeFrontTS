import { call, put, takeEvery } from 'redux-saga/effects';

import {
  getAllArticlesApi,
  deleteArticleApi,
  updateArticleCategoryApi,
  updateArticleApi,
  addArticleApi,
  getArticlesByCategoryApi,
  getArticleByIdApi,
} from '../../api/apiArticle';
import actionTypes from './actionTypes';
import { setAllArticles, setArticleById } from './slice';

export function* fetchArticlesSaga ( { payload } ) {
  try {
    const result = yield call( getAllArticlesApi, payload );
    yield put( setAllArticles( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* fetchArticlesByIdSaga ( { payload } ) {
  try {
    yield put( setArticleById( null ) );
    const result = yield call( getArticleByIdApi, payload );
    yield put( setArticleById( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* fetchArticlesByCategorySaga ( { payload } ) {
  try {
    const result = yield call( getArticlesByCategoryApi, payload );
    yield put( setAllArticles( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* updateArticleByIdSaga ( { payload } ) {
  try {
    yield call( updateArticleApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* updateArticleCategorySaga ( { payload } ) {
  try {
    const result = yield call( updateArticleCategoryApi, payload );
    yield put( setArticleById( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* addArticleByIdSaga ( { payload } ) {
  try {
    yield call( addArticleApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* deleteArticleSaga ( { payload } ) {
  try {
    yield call( deleteArticleApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export default [
  takeEvery( actionTypes.GET_ALL_ARTICLE, fetchArticlesSaga ),
  takeEvery( actionTypes.GET_ARTICLE_BY_ID, fetchArticlesByIdSaga ),
  takeEvery( actionTypes.GET_ALL_ARTICLES_BY_CATEGORY, fetchArticlesByCategorySaga ),
  takeEvery( actionTypes.UPDATE_ARTICLE, updateArticleByIdSaga ),
  takeEvery( actionTypes.UPDATE_ARTICLE_CATEGORY, updateArticleCategorySaga ),
  takeEvery( actionTypes.ADD_ARTICLE, addArticleByIdSaga ),
  takeEvery( actionTypes.DELETE_ARTICLE, deleteArticleSaga ),
];
