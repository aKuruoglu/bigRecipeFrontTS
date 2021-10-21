import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteArticle, getById } from '../../redux/article/actions';
import SimpleArticle from './SimpleArticle';

const ArticleById = ( {
  getByIdCall, deleteArticleCall, currentArticle, currentArticleInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'article';

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !currentArticleInStore ) {
    return null;
  }

  const handleDelete = () => {
    deleteArticleCall( id );
    history.push( '/article' );
  };

  const handleEdit = () => {
    history.push( `/article/edit/${ id }` );
  };

  return (
    <WrapSimple>
      <BreadCrumbs entity={ name } />
      <SimpleArticle article={ currentArticle } />
      <div className="d-flex justify-content-end">
        <Button className="btn-warning mt-2" onClick={ handleEdit }>Edit Article</Button>
        <Button className="btn-danger mt-2" onClick={ handleDelete }>Delete</Button>
      </div>
    </WrapSimple>
  );
};

ArticleById.propTypes = {
  currentArticle: PropTypes.shape( {
    _id: PropTypes.string,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    mainText: PropTypes.string,
    title: PropTypes.string,
  } ).isRequired,
  currentArticleInStore: PropTypes.bool.isRequired,
  getByIdCall: PropTypes.func.isRequired,
  deleteArticleCall: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  currentArticle: state.article.articleById ? state.article.articleById : {},
  currentArticleInStore: !!state.article.articleById,
} ), {
  getByIdCall: getById,
  deleteArticleCall: deleteArticle,
} )( ArticleById );
