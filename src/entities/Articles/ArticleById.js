import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteArticle, getById } from '../../redux/article/actions';
import SimpleArticle from './SimpleArticle';

const ArticleById = ( { getByIdCall, deleteArticleCall, currentArticle } ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'article';

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !currentArticle ) {
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

export default connect( ( state ) => ( {
  currentArticle: state.article.articleById,
} ), {
  getByIdCall: getById,
  deleteArticleCall: deleteArticle,
} )( ArticleById );
