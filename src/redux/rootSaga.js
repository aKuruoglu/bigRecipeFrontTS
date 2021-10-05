import { all } from 'redux-saga/effects';
import category from './category/categorySaga';
import recipe from './recipe/saga';

export default function* rootSaga () {
  yield all( [
    ...category,
    ...recipe,
  ] );
}
