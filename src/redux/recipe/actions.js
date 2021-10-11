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

export const getRecipesByCategory = ( id, page, limit ) => ( {
  type: actionTypes.GET_ALL_RECIPES_BY_CATEGORY,
  payload: {
    id,
    page,
    limit,
  },
} );

export const updateRecipe = ( data ) => ( {
  type: actionTypes.UPDATE_RECIPE,
  payload: {
    data,
  },
} );

export const updateRecipeCategory = ( id, catId ) => ( {
  type: actionTypes.UPDATE_RECIPE_CATEGORY,
  payload: {
    id,
    catId,
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


