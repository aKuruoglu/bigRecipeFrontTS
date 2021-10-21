import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import { addArticle } from '../../redux/article/actions';
import ArticleForm from './components/ArticleForm';

const ArticleAdd = ( { addArticleCall } ) => {
  const history = useHistory();
  const onSubmit = ( values ) => {
    addArticleCall( values );
    history.push( '/article' );
  };

  return (
    <WrapSimple>
      <ArticleForm
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

ArticleAdd.propTypes = {
  addArticleCall: PropTypes.func.isRequired,
};

export default connect( null, {
  addArticleCall: addArticle,
} )( ArticleAdd );
