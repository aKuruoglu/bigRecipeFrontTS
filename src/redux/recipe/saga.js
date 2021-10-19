import { call, put, takeEvery } from 'redux-saga/effects';

import {
  getAllRecipesApi,
  getRecipeByIdApi,
  updateRecipeApi,
  addRecipeApi,
  deleteRecipeApi,
  getRecipesByCategoryApi, updateRecipeCategoryApi,
} from '../../api/apiRecipe';
import actionTypes from './actionTypes';
import { changeRequestStatus, setAllRecipes, setRecipeById } from './slice';
import { setLoading } from '../common/slice';
import Notification from '../../utils/Notification';

export function* fetchRecipesSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getAllRecipesApi, payload );
    yield put( setAllRecipes( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchRecipesByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield put( setRecipeById( null ) );
    const result = yield call( getRecipeByIdApi, payload );
    yield put( setRecipeById( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchRecipesByCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( getRecipesByCategoryApi, payload );
    yield put( setAllRecipes( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateRecipeByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( updateRecipeApi, payload );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateRecipeCategorySaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    const result = yield call( updateRecipeCategoryApi, payload );
    yield put( setRecipeById( result.data ) );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addRecipeByIdSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( addRecipeApi, payload );
    yield put( setLoading( false ) );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteRecipeSaga ( { payload } ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteRecipeApi, payload );
    yield put( setLoading( false ) );
    yield put( changeRequestStatus( 'success' ) );
    Notification.success( 'Success deleting' );
  } catch ( e ) {
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export default [
  takeEvery( actionTypes.GET_ALL_RECIPE, fetchRecipesSaga ),
  takeEvery( actionTypes.GET_RECIPE_BY_ID, fetchRecipesByIdSaga ),
  takeEvery( actionTypes.GET_ALL_RECIPES_BY_CATEGORY, fetchRecipesByCategorySaga ),
  takeEvery( actionTypes.UPDATE_RECIPE, updateRecipeByIdSaga ),
  takeEvery( actionTypes.UPDATE_RECIPE_CATEGORY, updateRecipeCategorySaga ),
  takeEvery( actionTypes.ADD_RECIPE, addRecipeByIdSaga ),
  takeEvery( actionTypes.DELETE_RECIPE, deleteRecipeSaga ),
];
