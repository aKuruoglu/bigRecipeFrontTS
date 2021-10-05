import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getById, updateRecipe } from '../../redux/recipe/actions';

import BreadCrumbs from '../../components/BreadCrumbs';
import WrapChanges from '../../components/WrapChanges';
import RecipeForm from '../../components/forms/RecipeForm';

const RecipeEdit = ( { getByIdCall, recipeById, updateRecipeCall } ) => {
  const { id } = useParams();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  const onSubmit = ( values ) => {
    updateRecipeCall( values );
  };

  return (
    <WrapChanges>
      <BreadCrumbs />
      {recipeById && (
      <RecipeForm
        recipeById={ recipeById }
        onSubmit={ onSubmit }
      />
      )}
    </WrapChanges>
  );
};

export default connect( ( state ) => ( {
  recipeById: state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  updateRecipeCall: updateRecipe,
} )( RecipeEdit );
