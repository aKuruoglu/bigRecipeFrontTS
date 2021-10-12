import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import WrapSimple from '../../components/WrapSimple';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteRecipe, getById } from '../../redux/recipe/actions';

const RecipeById = ( { getByIdCall, currentRecipe, deleteRecipeCall } ) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !currentRecipe ) {
    return null;
  }

  const {
    _id, categoryId, title, description,
  } = currentRecipe;

  const handleDelete = () => {
    deleteRecipeCall( id );
    history.push( '/recipe' );
  };

  const handleEdit = () => {
    history.push( `/recipe/edit/${ id }` );
  };

  return (
    <WrapSimple>
      <BreadCrumbs />
      <div className="card p-2">
        <span>
          id:
          {_id}
        </span>
        <span>
          title:
          {title}
        </span>
        <span>
          description:
          {description}
        </span>
        <span>
          categoryId:
          {categoryId}
        </span>
      </div>
      <div className="d-flex justify-content-end">
        <Button className="btn-warning mt-2" onClick={ handleEdit }>Edit Recipe</Button>
        <Button className="btn-danger mt-2" onClick={ handleDelete }>Delete</Button>
      </div>
    </WrapSimple>
  );
};

export default connect( ( state ) => ( {
  currentRecipe: state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  deleteRecipeCall: deleteRecipe,
} )( RecipeById );
