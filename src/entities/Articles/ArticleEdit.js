import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { getById, updateArticle } from '../../redux/article/actions';
import ArticleForm from './components/ArticleForm';

const ArticleEdit = ( {
  currentArticle, updateArticleCall, getByIdCall, currentArticleInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'article';

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  const onSubmit = ( values ) => {
    updateArticleCall( values );
    history.push( `/article/${ id }` );
  };

  if ( !currentArticleInStore ) {
    return null;
  }

  return (
    <WrapSimple>
      <BreadCrumbs entity={ name } />
      <ArticleForm
        currentArticle={ omit( currentArticle, ['categoryId'] ) }
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

ArticleEdit.propTypes = {
  currentArticle: PropTypes.shape( {
    _id: PropTypes.string,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    mainText: PropTypes.string,
    title: PropTypes.string,
  } ).isRequired,
  currentArticleInStore: PropTypes.bool.isRequired,
  getByIdCall: PropTypes.func.isRequired,
  updateArticleCall: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  currentArticle: state.article.articleById ? state.article.articleById : {},
  currentArticleInStore: !!state.article.articleById,
} ), {
  getByIdCall: getById,
  updateArticleCall: updateArticle,
} )( ArticleEdit );
