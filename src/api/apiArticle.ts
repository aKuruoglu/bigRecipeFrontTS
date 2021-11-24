import axios from 'axios';
import { baseUrl } from '../config';
import { Id, Ids, Pagination } from '../redux/common/interface'
import { IAllArticles, IArticle } from '../redux/article/interface';

export const getAllArticlesApi = ( { page, limit }: Pagination ): Promise<IAllArticles> => axios.get( `${ baseUrl }/article/${ page }/${ limit }` );
export const getArticleByIdApi = ( id: Id ): Promise<IArticle> => axios.get( `${ baseUrl }/article/${ id }` );
export const getArticlesByCategoryApi = ( id: Id, { page, limit }: Pagination ): Promise<IAllArticles> => axios.get( `${ baseUrl }/article/category/${ id }/${ page }/${ limit }` );
export const updateArticleApi = ( data: IArticle ): Promise<IArticle> => axios.put( `${ baseUrl }/article/${ data._id }`, data );
export const updateArticleCategoryApi = ( { id, catId }: Ids ): Promise<IArticle> => axios.put( `${ baseUrl }/article/${ id }/change-category/${ catId }` );
export const addArticleApi = ( data: IArticle ): Promise<IArticle> => axios.post( `${ baseUrl }/article`, data );
export const deleteArticleApi = ( id: Id ): Promise<IArticle> => axios.delete( `${ baseUrl }/article/${ id }`, {
  data: {},
  headers: {
    'Content-Type': 'application/json',
  },
} );
