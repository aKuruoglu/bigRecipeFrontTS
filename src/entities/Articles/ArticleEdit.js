import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { getById, updateArticle } from '../../redux/article/actions';
import ArticleForm from './components/ArticleForm';

const ArticleEdit = ( { currentArticle, updateArticleCall, getByIdCall } ) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  const onSubmit = ( values ) => {
    updateArticleCall( values );
    history.push( `/article/${ id }` );
  };

  if ( !currentArticle ) {
    return null;
  }

  return (
    <WrapSimple>
      <BreadCrumbs />
      <ArticleForm
        currentArticle={ omit( currentArticle, ['categoryId'] ) }
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

export default connect( ( state ) => ( {
  currentArticle: state.article.articleById,
} ), {
  getByIdCall: getById,
  updateArticleCall: updateArticle,
} )( ArticleEdit );
