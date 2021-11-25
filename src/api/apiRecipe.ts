import axios from 'axios';
import { baseUrl } from '../config';
import {IAllEntities, Id, Ids, Pagination} from '../redux/common/interface';
import {IAllRecipe, IRecipe} from '../redux/recipe/interface';
import { IAllArticles } from '../redux/article/interface';

export const getAllRecipesApi = ( { page, limit }: Pagination ): Promise<IAllRecipe> => axios.get( `${ baseUrl }/recipe/${ page }/${ limit }` );
export const getRecipeByIdApi = ( id: Id ): Promise<IRecipe> => axios.get( `${ baseUrl }/recipe/${ id }` );
export const getRecipesByCategoryApi = ( id: Id, { page, limit }: Pagination ): Promise<IAllRecipe> => axios.get( `${ baseUrl }/recipe/category/${ id }/${ page }/${ limit }` );
export const updateRecipeApi = ( data: IRecipe ): Promise<IRecipe> => axios.put( `${ baseUrl }/recipe/${ data._id }`, data );
export const updateRecipeCategoryApi = ( { id, catId }: Ids ): Promise<IRecipe> => axios.put( `${ baseUrl }/recipe/${ id }/change-category/${ catId }` );
export const addRecipeApi = ( data: IRecipe ): Promise<IRecipe> => axios.post( `${ baseUrl }/recipe`, data );
export const deleteRecipeApi = ( id: Id ) => axios.delete( `${ baseUrl }/recipe/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
