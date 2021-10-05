import actionTypes from './actionTypes';

export const getAllRecipes = ( { page, limit } ) => ( {
  type: actionTypes.GET_ALL_RECIPE,
  payload: {
    page,
    limit,
  },
} );

export const getById = ( id ) => ( {
  type: actionTypes.GET_RECIPE_BY_ID,
  payload: {
    id,
  },
} );

export const updateRecipe = ( data ) => ( {
  type: actionTypes.UPDATE_RECIPE,
  payload: {
    data,
  },
} );

export const addRecipe = ( data ) => ( {
  type: actionTypes.ADD_RECIPE,
  payload: {
    data,
  },
} );

export const deleteRecipe = ( id ) => ( {
  type: actionTypes.DELETE_RECIPE,
  payload: {
    id,
  },
} );
