import axios from 'axios';
import { baseUrl } from '../config';
import { ICategory } from '../redux/category/interface';
import { Id } from '../redux/common/interface';

export const getAllCategories = () => axios.get( `${ baseUrl }/category` );
export const getById = ( id: Id ) => axios.get( `${ baseUrl }/category/${ id }` );
export const editCategory = ( { id, data }: { id: Id, data: ICategory } ) => axios.put( `${ baseUrl }/category/${ id }`, data );
export const addCategory = ( data: ICategory ) => axios.post( `${ baseUrl }/category`, data );
export const deleteCategory = ( id: Id ) => axios.delete( `${ baseUrl }/category/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
