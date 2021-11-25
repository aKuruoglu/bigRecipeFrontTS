import actionTypes from './actionTypes';
import { IAction, Id, Ids, Pagination } from '../common/interface';
import { IRecipe } from './interface';

export const getAllRecipes = ( { page, limit }: Pagination ): IAction<IRecipe> => ( {
  type: actionTypes.GET_ALL_RECIPE,
  payload: {
    page,
    limit,
  },
} );

export const getById = ( id: Id ): IAction<IRecipe> => ( {
  type: actionTypes.GET_RECIPE_BY_ID,
  payload: {
    id,
  },
} );

export const getRecipesByCategory = ( id: Id, { page, limit }: Pagination ): IAction<IRecipe> => ( {
  type: actionTypes.GET_ALL_RECIPES_BY_CATEGORY,
  payload: {
    id,
    pagination: {
      page,
      limit,
    },
  },
} );

export const updateRecipe = ( data: IRecipe ): IAction<IRecipe> => ( {
  type: actionTypes.UPDATE_RECIPE,
  payload: {
    data,
  },
} );

export const updateRecipeCategory = ( { id, catId }: Ids ): IAction<IRecipe> => ( {
  type: actionTypes.UPDATE_RECIPE_CATEGORY,
  payload: {
    id,
    catId,
  },
} );

export const addRecipe = ( data: IRecipe ): IAction<IRecipe> => ( {
  type: actionTypes.ADD_RECIPE,
  payload: {
    data,
  },
} );

export const deleteRecipe = ( id: Id ): IAction<IRecipe> => ( {
  type: actionTypes.DELETE_RECIPE,
  payload: {
    id,
  },
} );
