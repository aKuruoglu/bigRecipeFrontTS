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
import { setAllArticles, setArticleById, changeRequestStatus } from './slice';
import { setLoading } from '../common/slice';
import Notification from '../../utils/Notification';

export function* fetchArticlesSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getAllArticlesApi, payload );
    yield put( setAllArticles( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchArticlesByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield put( setArticleById( null ) );
    const result = yield call( getArticleByIdApi, payload );
    yield put( setArticleById( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchArticlesByCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getArticlesByCategoryApi, payload );
    yield put( setAllArticles( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateArticleByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( updateArticleApi, payload );
    yield put( setLoading( false ) );
    Notification.success( 'Success updating article' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateArticleCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( updateArticleCategoryApi, payload );
    yield put( setArticleById( result.data ) );
    yield put( setLoading( false ) );
    Notification.success( 'Success updating category' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addArticleByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( addArticleApi, payload );
    yield put( setLoading( false ) );
    Notification.success( 'Success adding' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteArticleSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteArticleApi, payload );
    yield put( setLoading( false ) );
    yield put( changeRequestStatus( 'success' ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
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
