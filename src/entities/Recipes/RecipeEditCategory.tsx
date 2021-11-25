import React, {FC, useState} from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import CategoryTree from '../../components/category/CategoryTree';
import { getById, updateRecipeCategory } from '../../redux/recipe/actions';
import BreadCrumbs from '../../components/BreadCrumbs';
import SimpleRecipe from './SimpleRecipe';
import WrapSimple from '../../components/WrapSimple';
import EditModal from '../../components/modals/EditModal';
import useKeysChain from '../../utils/useKeysChain';
import useGetById from '../../utils/useGetById';
import { IRecipe } from "../../redux/recipe/interface";
import { IAction, Id, Ids } from "../../redux/common/interface";
import { BreadTree } from "../../redux/category/interface";
import { RootState } from "../../redux/rootReducer";

interface RecipeEditCategoryProps {
  currentRecipe: IRecipe | null,
  getByIdCall: ( id: Id  ) => IAction<IRecipe>,
  crumbsMap: BreadTree,
  updateRecipeCategoryCall: ( {}: Ids ) => IAction<IRecipe>;
}

const RecipeEditCategory: FC<RecipeEditCategoryProps> = ( {
  currentRecipe,
  getByIdCall,
  crumbsMap,
  updateRecipeCategoryCall
} ) => {
  const { id }: { id: Id } = useParams();
  const history = useHistory();

  const { path } = useRouteMatch();
  const entity: string[] = path.split( '/' );

  const [catId, setCatId] = useState<Id | null>( null );

  useGetById( id, getByIdCall );

  if ( !currentRecipe ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const keysChain: string = useKeysChain( currentRecipe.categoryId, crumbsMap );

  if ( !keysChain ) {
    return null;
  }

  const handleClose = () => setCatId( null );
  const handleShow = ( { key }: { key: Id } ) => setCatId( key );

  const handleEditCategory = () => {
    let sendKey: string | undefined;
    if (catId) {
      sendKey = catId
        .split( '/' )
        .pop();
    }

    updateRecipeCategoryCall( { id, catId: sendKey! } );
    history.push( `/${ entity[1] }` );
  };

  return (
    <WrapSimple>
      <BreadCrumbs entity={ entity[1] } />
      <SimpleRecipe recipe={ currentRecipe } />
      <h2 className="mt-3">Change recipe category</h2>
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
  currentRecipe: state.recipe.recipeById,
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateRecipeCategoryCall: updateRecipeCategory,
} )( RecipeEditCategory );
