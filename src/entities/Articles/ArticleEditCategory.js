import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import CategoryTree from '../../components/category/CategoryTree';
import { getById, updateArticleCategory } from '../../redux/article/actions';
import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import SimpleArticle from './SimpleArticle';
import EditModal from '../../components/modals/EditModal';
import useKeysChain from '../../utils/useKeysChain';
import useGetById from '../../utils/useGetById';

const ArticleEditCategory = ( {
  currentArticle,
  getByIdCall,
  crumbsMap,
  updateArticleCategoryCall,
} ) => {
  const history = useHistory();
  const [catId, setCatId] = useState( null );
  const { path } = useRouteMatch();
  const entity = path.split( '/' );
  const { id } = useParams();

  useGetById( id, getByIdCall );

  if ( !currentArticle ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const keysChain = useKeysChain( currentArticle.categoryId, crumbsMap );

  if ( !keysChain ) {
    return null;
  }

  const handleClose = () => setCatId( null );
  const handleShow = ( { key } ) => setCatId( key );

  const handleEditCategory = () => {
    const sendKey = catId
      .split( '/' )
      .pop();
    updateArticleCategoryCall( id, sendKey );
    history.push( `/${ entity[1] }` );
  };

  return (
    <WrapSimple>
      <BreadCrumbs entity={ entity[1] } />
      <SimpleArticle article={ currentArticle } />
      <h2 className="mt-3">Change article category</h2>
      <CategoryTree initialActiveKey={ keysChain } onClickItem={ handleShow } />
      <EditModal
        handleClose={ handleClose }
        handleEdit={ handleEditCategory }
        catId={ !!catId }
      />
    </WrapSimple>

  );
};

export default connect( ( state ) => ( {
  currentArticle: state.article.articleById,
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateArticleCategoryCall: updateArticleCategory,
} )( ArticleEditCategory );
