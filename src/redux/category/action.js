import categoryActionsTypes from './categoryActionsTypes';

export const getCategories = () => ( { type: categoryActionsTypes.FETCH_CATEGORY_SAGA } );
export const getById = ( id ) => ( {
  type: categoryActionsTypes.GET_BY_ID,
  payload: {
    id,
  },
} );
export const editCategories = (id, data ) => ( {
  type: categoryActionsTypes.EDIT_CATEGORY,
  payload: {
    data,
    id,
  },
} );
