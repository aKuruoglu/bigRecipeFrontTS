import axios from 'axios';
import { baseUrl } from '../config';

export const getAllArticlesApi = ( { page, limit } ) => axios.get( `${ baseUrl }/article/${ page }/${ limit }` );
export const getArticleByIdApi = ( { id } ) => axios.get( `${ baseUrl }/article/${ id }` );
export const getArticlesByCategoryApi = ( { id, page, limit } ) => axios.get( `${ baseUrl }/article/category/${ id }/${ page }/${ limit }` );
export const updateArticleApi = ( { data } ) => axios.put( `${ baseUrl }/article/${ data._id }`, data );
export const updateArticleCategoryApi = ( { id, catId } ) => axios.put( `${ baseUrl }/article/${ id }/change-category/${ catId }` );
export const addArticleApi = ( { data } ) => axios.post( `${ baseUrl }/article`, data );
export const deleteArticleApi = ( { id } ) => axios.delete( `${ baseUrl }/article/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
