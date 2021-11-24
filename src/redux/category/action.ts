import { History } from 'history';
import categoryActionsTypes from './categoryActionsTypes';
import { Category } from './interface';
import { Id } from '../common/interface';

export const getCategories = () => ( { type: categoryActionsTypes.FETCH_CATEGORY_SAGA } );
export const getById = ( id: Id ) => ( {
  type: categoryActionsTypes.GET_BY_ID,
  payload: {
    id,
  },
} );

export const editCategories = ( id: Id, data: Category, history: History ) => ( {
  type: categoryActionsTypes.EDIT_CATEGORY,
  payload: {
    data,
    id,
    history,
  },
} );

export const deleteCategory = ( id: Id ) => ( {
  type: categoryActionsTypes.DELETE_CATEGORY,
  payload: {
    id,
  },
} );

export const addCategory = ( data: Category, history: History ) => ( {
  type: categoryActionsTypes.ADD_CATEGORY,
  payload: {
    data,
    history,
  },
} );
