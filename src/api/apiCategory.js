import axios from 'axios';
import { baseUrl } from '../config';

export const getAllCategories = () => axios.get( `${ baseUrl }/category` );
export const getById = ( data ) => axios.get( `${ baseUrl }/category/${ data }` );
export const editCategory = ( id, data ) => axios.put( `${ baseUrl }/category/${ id }`, data );
