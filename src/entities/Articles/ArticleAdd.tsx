import React, {FC} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import { addArticle } from '../../redux/article/actions';
import ArticleForm from './components/ArticleForm';
import { IArticle } from "../../redux/article/interface";
import { IAction } from "../../redux/common/interface";

interface ArticleAddProps {
  addArticleCall: ( {}: IArticle ) => IAction<IArticle>
}

const ArticleAdd: FC<ArticleAddProps> = ( { addArticleCall } ) => {
  const history = useHistory();
  const onSubmit = ( values: IArticle ) => {
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

export default connect( null, {
  addArticleCall: addArticle,
} )( ArticleAdd );
