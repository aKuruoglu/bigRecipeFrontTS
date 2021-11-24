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
import { PayloadAction } from "@reduxjs/toolkit";
import {IAllArticles, IArticle} from "./interface";
import {Id, Ids, Pagination, ResponseGenerator} from "../common/interface";

export function* fetchArticlesSaga ( { payload }: PayloadAction<Pagination> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IAllArticles> = yield call( getAllArticlesApi, payload );
    yield put( setAllArticles( result.data! ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchArticlesByIdSaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    yield put( setArticleById( null ) );
    const result: ResponseGenerator<IArticle> = yield call( getArticleByIdApi, payload.id );
    yield put( setArticleById( result.data! ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchArticlesByCategorySaga ( { payload }: PayloadAction<{id: Id, pagination: Pagination }> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IAllArticles> = yield call( getArticlesByCategoryApi, payload.id, payload.pagination );
    yield put( setAllArticles( result.data! ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateArticleByIdSaga ( { payload }: PayloadAction<{data: IArticle }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( updateArticleApi, payload.data );
    yield put( setLoading( false ) );
    Notification.success( 'Success updating article' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateArticleCategorySaga ( { payload }: PayloadAction<Ids> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IArticle> = yield call( updateArticleCategoryApi, payload );
    yield put( setArticleById( result.data! ) );
    yield put( setLoading( false ) );
    Notification.success( 'Success updating category' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addArticleByIdSaga ( { payload }: PayloadAction<{ data: IArticle }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( addArticleApi, payload.data );
    yield put( setLoading( false ) );
    Notification.success( 'Success adding' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteArticleSaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteArticleApi, payload.id );
    yield put( setLoading( false ) );
    yield put( changeRequestStatus( 'success' ) );
  } catch ( err ) {
    const e: any = err;
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
