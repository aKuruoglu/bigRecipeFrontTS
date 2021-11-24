import actionTypes from './actionTypes';
import {
  IAction,
  Id,
  Ids,
  Pagination,
} from '../common/interface';
import { IArticle } from './interface';

export const getAllArticles = ( { page, limit }: Pagination ) => ( {
  type: actionTypes.GET_ALL_ARTICLE,
  payload: {
    page,
    limit,
  },
} );

export const getById = ( id: Id ): IAction<IArticle> => ( {
  type: actionTypes.GET_ARTICLE_BY_ID,
  payload: {
    id,
  },
} );

export const getArticlesByCategory = ( id: Id, { page, limit }: Pagination ): IAction<IArticle> => ( {
  type: actionTypes.GET_ALL_ARTICLES_BY_CATEGORY,
  payload: {
    id,
    pagination: {
      page, limit,
    },
  },
} );

export const updateArticle = ( data: IArticle ): IAction<IArticle> => ( {
  type: actionTypes.UPDATE_ARTICLE,
  payload: {
    data,
  },
} );

export const updateArticleCategory = ( { id, catId }: Ids ): IAction<IArticle> => ( {
  type: actionTypes.UPDATE_ARTICLE_CATEGORY,
  payload: {
    id,
    catId,
  },
} );

export const addArticle = ( data: IArticle ): IAction<IArticle> => ( {
  type: actionTypes.ADD_ARTICLE,
  payload: {
    data,
  },
} );

export const deleteArticle = ( id: Id ) => ( {
  type: actionTypes.DELETE_ARTICLE,
  payload: {
    id,
  },
} );
