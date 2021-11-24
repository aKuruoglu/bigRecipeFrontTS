import actionTypes from './actionTypes';
import { Id, Ids, Pagination } from '../common/interface';
import { Recipe } from './interface';

export const getAllRecipes = ( { page, limit }: Pagination ) => ( {
  type: actionTypes.GET_ALL_RECIPE,
  payload: {
    page,
    limit,
  },
} );

export const getById = ( id: Id ) => ( {
  type: actionTypes.GET_RECIPE_BY_ID,
  payload: {
    id,
  },
} );

export const getRecipesByCategory = ( id: Id, { page, limit }: Pagination ) => ( {
  type: actionTypes.GET_ALL_RECIPES_BY_CATEGORY,
  payload: {
    id,
    pagination: {
      page,
      limit,
    },
  },
} );

export const updateRecipe = ( data: Recipe ) => ( {
  type: actionTypes.UPDATE_RECIPE,
  payload: {
    data,
  },
} );

export const updateRecipeCategory = ( { id, catId }: Ids ) => ( {
  type: actionTypes.UPDATE_RECIPE_CATEGORY,
  payload: {
    id,
    catId,
  },
} );

export const addRecipe = ( data: Recipe ) => ( {
  type: actionTypes.ADD_RECIPE,
  payload: {
    data,
  },
} );

export const deleteRecipe = ( id: Id ) => ( {
  type: actionTypes.DELETE_RECIPE,
  payload: {
    id,
  },
} );
