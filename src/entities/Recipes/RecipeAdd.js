import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import { addRecipe } from '../../redux/recipe/actions';
import RecipeForm from './components/RecipeForm';

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

RecipeAdd.propTypes = {
  addRecipeCall: PropTypes.func.isRequired,
};

export default connect( null, {
  addRecipeCall: addRecipe,
} )( RecipeAdd );
