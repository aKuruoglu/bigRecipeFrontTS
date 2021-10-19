import React from 'react';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import RecipeForm from './components/RecipeForm';
import { getById, updateRecipe } from '../../redux/recipe/actions';
import useGetById from '../../utils/useGetById';

const RecipeEdit = ( { getByIdCall, currentRecipe, updateRecipeCall } ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'recipe';
  console.log(history)
  useGetById( id, getByIdCall );

  const onSubmit = ( values ) => {
    updateRecipeCall( values );
    history.push( '/recipe' );
  };

  if ( !currentRecipe ) {
    return null;
  }

  return (
    <WrapSimple>
      <BreadCrumbs entity={ name } />
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
