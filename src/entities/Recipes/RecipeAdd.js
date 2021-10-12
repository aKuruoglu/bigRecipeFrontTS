import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import { addRecipe } from '../../redux/recipe/actions';
import RecipeForm from '../../components/forms/RecipeForm';

const RecipeAdd = ( { addRecipeCall } ) => {
  const history = useHistory();
  const onSubmit = ( values ) => {
    addRecipeCall( values );
    history.push( '/recipe' );
  };

  return (
    <WrapSimple>
      <RecipeForm
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

export default connect( null, {
  addRecipeCall: addRecipe,
} )( RecipeAdd );
