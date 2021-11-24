import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { getById, updateArticle } from '../../redux/article/actions';
import ArticleForm from './components/ArticleForm';
import { IArticle } from "../../redux/article/interface";
import { IAction, Id } from "../../redux/common/interface";
import { RootState } from "../../redux/rootReducer";

interface ArticleEditProps {
  currentArticle: IArticle | null;
  updateArticleCall: ( {}: IArticle ) => IAction<IArticle>;
  getByIdCall: ( id: Id ) => IAction<IArticle>;
}

const ArticleEdit: FC<ArticleEditProps> = ( {
  currentArticle, updateArticleCall, getByIdCall,
} ) => {
  const { id }: { id: Id } = useParams();
  const history = useHistory();
  const name: string = 'article';

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  const onSubmit = ( values: IArticle ) => {
    updateArticleCall( values );
    history.push( `/article/${ id }` );
  };

  if ( !currentArticle ) {
    return null;
  }

  return (
    <WrapSimple>
      <BreadCrumbs entity={ name } />
      <ArticleForm
        currentArticle={ currentArticle }
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

export default connect( ( state: RootState ) => ( {
  currentArticle: state.article.articleById,
} ), {
  getByIdCall: getById,
  updateArticleCall: updateArticle,
} )( ArticleEdit );
