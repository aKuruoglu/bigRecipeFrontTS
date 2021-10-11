import React from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RecipeForm from '../../components/forms/RecipeForm';
import WrapChanges from '../../components/WrapChanges';
import { addRecipe } from '../../redux/recipe/actions';

const RecipeAdd = ( { addRecipeCall } ) => {
  const history = useHistory();
  const onSubmit = ( values ) => {
    addRecipeCall( values );
    history.goBack();
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
