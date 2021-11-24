import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  currentRecipeInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  const { path } = useRouteMatch();
  const entity = path.split( '/' );

  const [catId, setCatId] = useState( null );

  useGetById( id, getByIdCall );

  if ( !currentRecipeInStore ) {
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
    updateRecipeCategoryCall( { id, catId: sendKey } );
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

RecipeEditCategory.propTypes = {
  currentRecipe: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
  } ).isRequired,
  currentRecipeInStore: PropTypes.bool.isRequired,
  crumbsMap: PropTypes.objectOf( PropTypes.object ).isRequired,
  getByIdCall: PropTypes.func.isRequired,
  updateRecipeCategoryCall: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById ? state.recipe.recipeById : {},
  currentRecipeInStore: !!state.recipe.recipeById,
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateRecipeCategoryCall: updateRecipeCategory,
} )( RecipeEditCategory );
