import axios from 'axios';
import config from '../config';

export const getAllArticlesApi = axios.get( `${ config.baseUrl }/article` );
export const getArticleByIdApi = ( { id } ) => axios.get( `${ config.baseUrl }/article/${ id }` );
export const getArticlesByCategoryApi = ( { id, page, limit } ) => axios.get( `${ config.baseUrl }/article/category/${ id }/${ page }/${ limit }` );
export const updateArticleApi = ( { data } ) => axios.put( `${ config.baseUrl }/article/${ data._id }`, data );
export const updateArticleCategoryApi = ( { id, catId } ) => axios.put( `${ config.baseUrl }/article/${ id }/change-category/${ catId }` );
export const addArticleApi = ( { data } ) => axios.post( `${ config.baseUrl }/article`, data );
export const deleteArticleApi = ( { id } ) => axios.delete( `${ config.baseUrl }/article/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
