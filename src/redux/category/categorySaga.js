import { call, put, takeEvery } from 'redux-saga/effects';

import {
  addCategory,
  deleteCategory, editCategory, getAllCategories, getById,
} from '../../api/apiCategory';
import { setAllCategory, setCategoryById } from './categorySlice';
import categoryActionsTypes from './categoryActionsTypes';
import Notification from '../../utils/Notification';
import { setLoading } from '../common/slice';

export function* fetchCategoriesSaga () {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getAllCategories );
    yield put( setAllCategory( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchCategoryByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getById, payload.id );
    yield put( setCategoryById( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* sendEditCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const edit = yield call( editCategory, payload );
    yield put( setCategoryById( edit.data ) );
    const result = yield call( getAllCategories );
    yield put( setAllCategory( result.data ) );
    yield put( setLoading( false ) );
    Notification.success( 'Success update' );
    payload.history.push( '/category' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteCategory, payload );
    const result = yield call( getAllCategories );
    yield put( setAllCategory( result.data ) );
    yield put( setLoading( false ) );
    Notification.success( 'Successful deletion' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( addCategory, payload );
    const result = yield call( getAllCategories );
    yield put( setAllCategory( result.data ) );
    yield put( setLoading( false ) );
    Notification.success( 'Successful addition' );
    payload.history.push( '/category' );
  } catch ( e ) {
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
