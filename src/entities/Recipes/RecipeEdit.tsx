import React, {FC} from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import RecipeForm from './components/RecipeForm';
import { getById, updateRecipe } from '../../redux/recipe/actions';
import useGetById from '../../utils/useGetById';
import { IAction, Id } from '../../redux/common/interface';
import { IRecipe } from '../../redux/recipe/interface';
import { RootState } from '../../redux/rootReducer';

interface RecipeEditProps {
  getByIdCall: ( id: Id ) => IAction<IRecipe>
  currentRecipe: IRecipe | null
  updateRecipeCall: ( {}: IRecipe ) => IAction<IRecipe>
}

const RecipeEdit: FC<RecipeEditProps> = ( { getByIdCall, currentRecipe, updateRecipeCall } ) => {
  const { id }: { id: Id } = useParams();
  const history = useHistory();
  const name: string = 'recipe';
  useGetById( id, getByIdCall );

  const onSubmit = ( values: IRecipe ) => {
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
        // currentRecipe={ omit( currentRecipe, ['categoryId'] ) }
        currentRecipe={ currentRecipe }
        onSubmit={ onSubmit }
      />
    </WrapSimple>
  );
};

export default connect( ( state: RootState ) => ( {
  currentRecipe: state.recipe.recipeById,
  currentRecipeInStore: !!state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  updateRecipeCall: updateRecipe,
} )( RecipeEdit );
