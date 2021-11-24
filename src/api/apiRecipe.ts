import axios from 'axios';
import { baseUrl } from '../config';
import { Id, Ids, Pagination } from '../redux/common/interface';
import { Recipe } from '../redux/recipe/interface';

export const getAllRecipesApi = ( { page, limit }: Pagination ): Promise<Recipe[]> => axios.get( `${ baseUrl }/recipe/${ page }/${ limit }` );
export const getRecipeByIdApi = ( id: Id ): Promise<Recipe> => axios.get( `${ baseUrl }/recipe/${ id }` );
export const getRecipesByCategoryApi = ( id: Id, {page, limit }: Pagination ): Promise<Recipe[]> => axios.get( `${ baseUrl }/recipe/category/${ id }/${ page }/${ limit }` );
export const updateRecipeApi = ( data: Recipe ): Promise<Recipe> => axios.put( `${ baseUrl }/recipe/${ data._id }`, data );
export const updateRecipeCategoryApi = ( { id, catId }: Ids ): Promise<Recipe> => axios.put( `${ baseUrl }/recipe/${ id }/change-category/${ catId }` );
export const addRecipeApi = ( data: Recipe ): Promise<Recipe> => axios.post( `${ baseUrl }/recipe`, data );
export const deleteRecipeApi = ( id: Id ) => axios.delete( `${ baseUrl }/recipe/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
