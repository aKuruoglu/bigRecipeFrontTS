import React, {FC} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import { addRecipe } from '../../redux/recipe/actions';
import RecipeForm from './components/RecipeForm';
import { IRecipe } from '../../redux/recipe/interface';
import { IAction } from '../../redux/common/interface';

interface RecipeAddProps {
  addRecipeCall: ( {}: IRecipe ) => IAction<IRecipe>
}

const RecipeAdd: FC<RecipeAddProps> = ( { addRecipeCall } ) => {
  const history = useHistory();
  const onSubmit = ( values: IRecipe ) => {
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
