import axios from 'axios';
import config from '../config';

export const getAllCategories = () => axios.get( `${ config.baseUrl }/category` );
export const getById = ( data ) => axios.get( `${ config.baseUrl }/category/${ data }` );
export const editCategory = ( id, data ) => axios.put( `${ config.baseUrl }/category/${ id }`, data );
