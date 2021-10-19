import React, { useState } from 'react';
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

const RecipeEditCategory = ( {
  currentRecipe,
  getByIdCall,
  crumbsMap,
  updateRecipeCategoryCall,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  const { path } = useRouteMatch();
  const entity = path.split( '/' );

  const [catId, setCatId] = useState( null );

  useGetById( id, getByIdCall );

  if ( !currentRecipe ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const keysChain = useKeysChain( currentRecipe.categoryId, crumbsMap );

  if ( !keysChain ) {
    return null;
  }

  const handleClose = () => setCatId( null );
  const handleShow = ( { key } ) => setCatId( key );

  const handleEditCategory = () => {
    const sendKey = catId
      .split( '/' )
      .pop();
    updateRecipeCategoryCall( id, sendKey );
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

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById,
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateRecipeCategoryCall: updateRecipeCategory,
} )( RecipeEditCategory );
