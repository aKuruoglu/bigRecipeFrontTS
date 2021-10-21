import React, { useState } from 'react';
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

const RecipeById = ( {
  getByIdCall, currentRecipe, deleteRecipeCall, currentRecipeInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();
  const name = 'recipe';
  const [show, setShow] = useState( false );

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  useGetById( id, getByIdCall );

  if ( !currentRecipeInStore ) {
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

RecipeById.propTypes = {
  currentRecipe: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
  } ).isRequired,
  currentRecipeInStore: PropTypes.bool.isRequired,
  getByIdCall: PropTypes.func.isRequired,
  deleteRecipeCall: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById ? state.recipe.recipeById : {},
  currentRecipeInStore: !!state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  deleteRecipeCall: deleteRecipe,
} )( RecipeById );
