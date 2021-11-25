import React, {FC, useState} from 'react';
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
import { RootState } from "../../redux/rootReducer";
import { IArticle } from "../../redux/article/interface";
import { IAction, Id, Ids } from "../../redux/common/interface";
import { BreadTree } from "../../redux/category/interface";

interface ArticleEditCategoryProps {
  currentArticle: IArticle | null,
  getByIdCall: ( id: Id ) => IAction<IArticle>;
  crumbsMap: BreadTree,
  updateArticleCategoryCall: ( {}: Ids ) => IAction<IArticle>,
}

const ArticleEditCategory: FC<ArticleEditCategoryProps> = ( {
  currentArticle,
  getByIdCall,
  crumbsMap,
  updateArticleCategoryCall,
} ) => {
  const history = useHistory();
  const [catId, setCatId] = useState<Id | null>( null );
  const { path } = useRouteMatch();
  const entity = path.split( '/' );
  const { id }: { id: Id } = useParams();
  useGetById( id, getByIdCall );

  if ( !currentArticle ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const keysChain = useKeysChain( currentArticle.categoryId!, crumbsMap );

  if ( !keysChain ) {
    return null;
  }

  const handleClose = () => setCatId( null );
  const handleShow = ( { key }: { key: string } ) => setCatId( key );

  const handleEditCategory = () => {
    let sendKey: string | undefined
    if (catId) {
      sendKey = catId
        .split( '/' )
        .pop();
    }


    updateArticleCategoryCall( { id, catId: sendKey } as Ids );
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


export default connect( ( state: RootState ) => ( {
  currentArticle: state.article.articleById,
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateArticleCategoryCall: updateArticleCategory,
} )( ArticleEditCategory );
