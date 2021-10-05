import axios from 'axios';
import config from '../config';

export const getAllRecipesApi = ( { page, limit } ) => axios.get( `${ config.baseUrl }/recipe/${ page }/${ limit }` );
export const getRecipeByIdApi = ( { id } ) => axios.get( `${ config.baseUrl }/recipe/${ id }` );
export const updateRecipeApi = ( { data } ) => axios.put( `${ config.baseUrl }/recipe/${ data._id }`, data );
export const addRecipeApi = ( { data } ) => axios.post( `${ config.baseUrl }/recipe`, data );
export const deleteRecipeApi = ( { id } ) => axios.delete( `${ config.baseUrl }/recipe/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
