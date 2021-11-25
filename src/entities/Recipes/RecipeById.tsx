import React, {FC, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteRecipe, getById } from '../../redux/recipe/actions';
import SimpleRecipe from './SimpleRecipe';
import useGetById from '../../utils/useGetById';
import DeleteModal from '../../components/modals/DeleteModal';
import {deleteEntityType, IAction, Id} from "../../redux/common/interface";
import {IRecipe} from '../../redux/recipe/interface';
import {RootState} from '../../redux/rootReducer';

interface RecipeByIdProps {
  getByIdCall: ( id: Id ) => IAction<IRecipe>;
  currentRecipe: IRecipe | null;
  deleteRecipeCall: deleteEntityType<IRecipe>
}

const RecipeById: FC<RecipeByIdProps> = ( {
  getByIdCall, currentRecipe, deleteRecipeCall } ) => {
  const { id }: {id: Id} = useParams();
  const history = useHistory();
  const name: string = 'recipe';
  const [show, setShow] = useState<boolean>( false );

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  useGetById( id, getByIdCall );

  if ( !currentRecipe ) {
    return null;
  }

  const handleDelete = () => {
    deleteRecipeCall( id );
    history.push( '/recipe' );
  };

  const handleEdit = () => {
    history.push( `/recipe/edit/${ id }` );
  };

  return (
    <WrapSimple>
      <BreadCrumbs entity={ name } />
      <SimpleRecipe recipe={ currentRecipe } />
      <div className="d-flex justify-content-end">
        <Button className="btn-warning mt-2" onClick={ handleEdit }>Edit Recipe</Button>
        <Button className="btn-danger mt-2" onClick={ handleShow }>Delete</Button>
      </div>
      <DeleteModal
        handleDelete={ handleDelete }
        handleClose={ handleClose }
        open={ show }
        entity={ name }
      />
    </WrapSimple>
  );
};

export default connect( ( state: RootState ) => ( {
  currentRecipe: state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  deleteRecipeCall: deleteRecipe,
} )( RecipeById );
