import { call, put, takeEvery } from 'redux-saga/effects';

import {
  getAllRecipesApi,
  getRecipeByIdApi,
  updateRecipeApi,
  addRecipeApi,
  deleteRecipeApi,
} from '../../api/apiRecipe';
import actionTypes from './actionTypes';
import { setAllRecipes, setById } from './slice';

export function* fetchRecipesSaga ( { payload } ) {
  try {
    const result = yield call( getAllRecipesApi, payload );
    yield put( setAllRecipes( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}
export function* fetchRecipesByIdSaga ( { payload } ) {
  try {
    const result = yield call( getRecipeByIdApi, payload );
    yield put( setById( result.data ) );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}
export function* updateRecipeByIdSaga ( { payload } ) {
  try {
    yield call( updateRecipeApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}
export function* addRecipeByIdSaga ( { payload } ) {
  try {
    yield call( addRecipeApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}
export function* deleteRecipeSaga ( { payload } ) {
  try {
    yield call( deleteRecipeApi, payload );
  } catch ( e ) {
    yield put( { type: 'TODO_FETCH_FAILED' } );
  }
}

export default [
  takeEvery( actionTypes.GET_ALL_RECIPE, fetchRecipesSaga ),
  takeEvery( actionTypes.GET_RECIPE_BY_ID, fetchRecipesByIdSaga ),
  takeEvery( actionTypes.UPDATE_RECIPE, updateRecipeByIdSaga ),
  takeEvery( actionTypes.ADD_RECIPE, addRecipeByIdSaga ),
  takeEvery( actionTypes.DELETE_RECIPE, deleteRecipeSaga ),
];
