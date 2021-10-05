import React from 'react';

import { connect } from 'react-redux';
import RecipeForm from '../../components/forms/RecipeForm';
import WrapChanges from '../../components/WrapChanges';
import { addRecipe } from '../../redux/recipe/actions';

const RecipeAdd = () => {
  const onSubmit = ( values ) => {
    console.log( values );
  };

  return (
    <WrapChanges>
      <RecipeForm
        onSubmit={ onSubmit }
      />
    </WrapChanges>
  );
};

export default connect( null, {
  addRecipeCall: addRecipe,
} )( RecipeAdd );
