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
import { PayloadAction } from "@reduxjs/toolkit";
import {IAllEntities, Id, Ids, Pagination, ResponseGenerator} from "../common/interface";
import {IAllRecipe, IRecipe} from "./interface";

export function* fetchRecipesSaga ( { payload }: PayloadAction<Pagination> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IAllRecipe> = yield call( getAllRecipesApi, payload );
    yield put( setAllRecipes( result.data || null ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchRecipesByIdSaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    yield put( setRecipeById( null ) );
    const result: ResponseGenerator<IRecipe> = yield call( getRecipeByIdApi, payload.id );
    yield put( setRecipeById( result.data || null ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* fetchRecipesByCategorySaga ( { payload }: PayloadAction<{id: Id, pagination: Pagination }> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IAllRecipe> = yield call( getRecipesByCategoryApi, payload.id, payload.pagination );
    yield put( setAllRecipes( result.data || null ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateRecipeByIdSaga ( { payload }: PayloadAction<{ data: IRecipe }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( updateRecipeApi, payload.data );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* updateRecipeCategorySaga ( { payload }: PayloadAction<Ids> ) {
  try {
    yield put( setLoading( true ) );
    const result: ResponseGenerator<IRecipe> = yield call( updateRecipeCategoryApi, payload );
    yield put( setRecipeById( result.data || null ) );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* addRecipeByIdSaga ( { payload }: PayloadAction<{ data: IRecipe }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( addRecipeApi, payload.data );
    yield put( setLoading( false ) );
  } catch ( err ) {
    const e: any = err;
    yield put( setLoading( false ) );
    const res = e.response.data[0];
    Notification.error( res.message );
  }
}

export function* deleteRecipeSaga ( { payload }: PayloadAction<{ id: Id }> ) {
  try {
    yield put( setLoading( true ) );
    yield call( deleteRecipeApi, payload.id );
    yield put( setLoading( false ) );
    yield put( changeRequestStatus( 'success' ) );
    Notification.success( 'Success deleting' );
  } catch ( err ) {
    const e: any = err;
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
