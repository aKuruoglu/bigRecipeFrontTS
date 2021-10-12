import axios from 'axios';
import { baseUrl } from '../config';

export const getAllRecipesApi = ( { page, limit } ) => axios.get( `${ baseUrl }/recipe/${ page }/${ limit }` );
export const getRecipeByIdApi = ( { id } ) => axios.get( `${ baseUrl }/recipe/${ id }` );
export const getRecipesByCategoryApi = ( { id, page, limit } ) => axios.get( `${ baseUrl }/recipe/category/${ id }/${ page }/${ limit }` );
export const updateRecipeApi = ( { data } ) => axios.put( `${ baseUrl }/recipe/${ data._id }`, data );
export const updateRecipeCategoryApi = ( { id, catId } ) => axios.put( `${ baseUrl }/recipe/${ id }/change-category/${ catId }` );
export const addRecipeApi = ( { data } ) => axios.post( `${ baseUrl }/recipe`, data );
export const deleteRecipeApi = ( { id } ) => axios.delete( `${ baseUrl }/recipe/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
