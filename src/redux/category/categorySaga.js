import { call, put, takeEvery } from 'redux-saga/effects';

import { editCategory, getAllCategories, getById } from '../../api/apiCategory';
import { setAllCategory, setCategoryById } from './categorySlice';
import categoryActionsTypes from './categoryActionsTypes';

export function* fetchCategoriesSaga () {
  try {
    const result = yield call( getAllCategories );

    yield put( setAllCategory( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* fetchCategoryByIdSaga ( { payload } ) {
  try {
    const result = yield call( getById, payload.id );

    yield put( setCategoryById( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export function* sendEditCategorySaga ( { payload } ) {
  console.log(payload)
  try {
    const result = yield call( editCategory, payload );
    yield put( setCategoryById( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export default [
  takeEvery( categoryActionsTypes.FETCH_CATEGORY_SAGA, fetchCategoriesSaga ),
  takeEvery( categoryActionsTypes.GET_BY_ID, fetchCategoryByIdSaga ),
  takeEvery( categoryActionsTypes.EDIT_CATEGORY, sendEditCategorySaga ),
];
