import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { get } from 'lodash';

import CategoryTree from '../../components/category/CategoryTree';
import { getById, updateRecipeCategory } from '../../redux/recipe/actions';

const RecipeEditCategory = ( {
  categoryId,
  getByIdCall,
  crumbsArray,
  updateRecipeCategoryCall,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !categoryId ) {
    return null;
  }

  let category = crumbsArray.find( ( item ) => item._id === categoryId );
  const res = [];

  while ( category ) {
    res.unshift( category._id );
    category = category.parent;
  }

  const keysChain = res.join( '/' );

  if ( !keysChain ) {
    return null;
  }

  const handleEditCategory = ( { key } ) => {
    const sendKey = key
      .split( '/' )
      .pop();
    updateRecipeCategoryCall( id, sendKey );
    history.goBack();
  };

  return (
    <CategoryTree initialActiveKey={ res.join( '/' ) } onClickItem={ handleEditCategory } />
  );
};

export default connect( ( state ) => ( {
  categoryId: get( state, 'recipe.recipeById.categoryId' ),
  crumbsArray: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateRecipeCategoryCall: updateRecipeCategory,
} )( RecipeEditCategory );
