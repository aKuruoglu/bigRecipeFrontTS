import { History } from 'history';
import categoryActionsTypes from './categoryActionsTypes';
import { ICategory } from './interface';
import {IAction, Id} from '../common/interface';

export const getCategories = (): IAction<ICategory> => ( { type: categoryActionsTypes.FETCH_CATEGORY_SAGA } );
export const getById = ( id: Id ): IAction<ICategory> => ( {
  type: categoryActionsTypes.GET_BY_ID,
  payload: {
    id,
  },
} );

export const editCategories = (id: Id, data: ICategory, history: History ): IAction<ICategory> => ( {
  type: categoryActionsTypes.EDIT_CATEGORY,
  payload: {
    data,
    id,
    history,
  },
} );

export const deleteCategory = ( id: Id ): IAction<ICategory> => ( {
  type: categoryActionsTypes.DELETE_CATEGORY,
  payload: {
    id,
  },
} );

export const addCategory = (data: ICategory, history: History ): IAction<ICategory> => ( {
  type: categoryActionsTypes.ADD_CATEGORY,
  payload: {
    data,
    history,
  },
} );
