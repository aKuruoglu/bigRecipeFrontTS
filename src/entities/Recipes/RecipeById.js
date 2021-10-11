import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { deleteRecipe, getById } from '../../redux/recipe/actions';

import WrapChanges from '../../components/WrapChanges';
import BreadCrumbs from '../../components/BreadCrumbs';

const RecipeById = ( { getByIdCall, recipeById, deleteRecipeCall } ) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !recipeById ) {
    return null;
  }

  const {
    _id, categoryId, title, description,
  } = recipeById;

  const handleDelete = () => {
    deleteRecipeCall( id );
    history.push( '/recipe' );
  };

  const handleEdit = () => {
    history.push( `/recipe/edit/${ id }` );
  };

  return (
    <WrapChanges>
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
    </WrapChanges>
  );
};

export default connect( ( state ) => ( {
  recipeById: state.recipe.recipeById,
} ), {
  getByIdCall: getById,
  deleteRecipeCall: deleteRecipe,
} )( RecipeById );
