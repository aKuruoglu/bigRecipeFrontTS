import { call, put, takeEvery } from 'redux-saga/effects';

import {
  addCategory,
  deleteCategory, editCategory, getAllCategories, getById,
} from '../../api/apiCategory';
import { setAllCategory, setCategoryById } from './categorySlice';
import categoryActionsTypes from './categoryActionsTypes';
import Notification from '../../utils/Notification';
import { setLoading } from '../common/slice';
import { ICategory } from './interface';
import {PayloadAction} from "@reduxjs/toolkit";
import { History } from 'history';
import { Id, ResponseGenerator } from "../common/interface";

export function* fetchCategoriesSaga () {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<ICategory[]> = yield call( getAllCategories );
    yield put( setAllCategory( result.data! ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchCategoryByIdSaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<ICategory> = yield call( getById, payload.id );
    yield put( setCategoryById( result.data! ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* sendEditCategorySaga ( { payload }: PayloadAction<{ id: Id, data: ICategory, history: History }>  ) {
  try {
    yield put( setLoading( true ) );
    const edit: ResponseGenerator<ICategory>  = yield call( editCategory, payload );
    yield put( setCategoryById( edit.data! ) );
    const result: ResponseGenerator<ICategory[]> = yield call( getAllCategories );
    yield put( setAllCategory( result.data! ) );
    yield put( setLoading( false ) );
    Notification.success( 'Success update' );
    // @ts-ignore
    payload.history.push( '/category' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteCategorySaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteCategory, payload.id );
    const result: ResponseGenerator<ICategory[]> = yield call( getAllCategories );
    yield put( setAllCategory( result.data! ) );
    yield put( setLoading( false ) );
    Notification.success( 'Successful deletion' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addCategorySaga ( { payload }: PayloadAction<{ data: ICategory, history: History }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( addCategory, payload.data );
    const result: ResponseGenerator<ICategory[]> = yield call( getAllCategories );
    yield put( setAllCategory( result.data! ) );
    yield put( setLoading( false ) );
    Notification.success( 'Successful addition' );
    // @ts-ignore
    payload.history.push( '/category' );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export default [
  takeEvery( categoryActionsTypes.FETCH_CATEGORY_SAGA, fetchCategoriesSaga ),
  takeEvery( categoryActionsTypes.GET_BY_ID, fetchCategoryByIdSaga ),
  takeEvery( categoryActionsTypes.EDIT_CATEGORY, sendEditCategorySaga ),
  takeEvery( categoryActionsTypes.DELETE_CATEGORY, deleteCategorySaga ),
  takeEvery( categoryActionsTypes.ADD_CATEGORY, addCategorySaga ),
];
