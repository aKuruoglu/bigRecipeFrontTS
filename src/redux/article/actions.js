import actionTypes from './actionTypes';

export const getAllArticles = ( { page, limit } ) => ( {
  type: actionTypes.GET_ALL_ARTICLE,
  payload: {
    page,
    limit,
  },
} );

export const getById = ( id ) => ( {
  type: actionTypes.GET_ARTICLE_BY_ID,
  payload: {
    id,
  },
} );

export const getArticlesByCategory = ( id, page, limit ) => ( {
  type: actionTypes.GET_ALL_ARTICLES_BY_CATEGORY,
  payload: {
    id,
    page,
    limit,
  },
} );

export const updateArticle = ( data ) => ( {
  type: actionTypes.UPDATE_ARTICLE,
  payload: {
    data,
  },
} );

export const updateArticleCategory = ( id, catId ) => ( {
  type: actionTypes.UPDATE_ARTICLE_CATEGORY,
  payload: {
    id,
    catId,
  },
} );

export const addArticle = ( data ) => ( {
  type: actionTypes.ADD_ARTICLE,
  payload: {
    data,
  },
} );

export const deleteArticle = ( id ) => ( {
  type: actionTypes.DELETE_ARTICLE,
  payload: {
    id,
  },
} );
