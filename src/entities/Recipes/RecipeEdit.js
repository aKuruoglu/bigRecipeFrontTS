import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import RecipeForm from './components/RecipeForm';
import { getById, updateRecipe } from '../../redux/recipe/actions';
import useGetById from '../../utils/useGetById';

const RecipeEdit = ( {
  getByIdCall, currentRecipe, updateRecipeCall, currentRecipeInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'recipe';
  useGetById( id, getByIdCall );

  const onSubmit = ( values ) => {
    updateRecipeCall( values );
    history.push( '/recipe' );
  };

  if ( !currentRecipeInStore ) {
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

RecipeEdit.propTypes = {
  currentRecipe: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
  } ).isRequired,
  currentRecipeInStore: PropTypes.bool.isRequired,
  getByIdCall: PropTypes.func.isRequired,
  updateRecipeCall: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById ? state.recipe.recipeById : {},
  currentRecipeInStore: !!state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  updateRecipeCall: updateRecipe,
} )( RecipeEdit );
