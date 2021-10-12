import React, { useEffect } from 'react';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import RecipeForm from '../../components/forms/RecipeForm';
import { getById, updateRecipe } from '../../redux/recipe/actions';

const RecipeEdit = ( { getByIdCall, currentRecipe, updateRecipeCall } ) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  const onSubmit = ( values ) => {
    updateRecipeCall( values );
    history.push( `/recipe/${ id }` );
  };

  if ( !currentRecipe ) {
    return null;
  }

  return (
    <WrapSimple>
      <BreadCrumbs />
      <RecipeForm
        currentRecipe={ omit( currentRecipe, ['categoryId'] ) }
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  updateRecipeCall: updateRecipe,
} )( RecipeEdit );
