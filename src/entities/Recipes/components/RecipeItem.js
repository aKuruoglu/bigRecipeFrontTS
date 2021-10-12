import React, { useState } from 'react';
import {
  Button, ButtonGroup, DropdownButton, Dropdown, Modal,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../../redux/recipe/actions';
import { cleanStoreRecipes } from '../../../redux/recipe/slice';

const RecipeItem = ( { item, deleteRecipeCall, cleanStoreRecipesCall } ) => {
  const history = useHistory();
  const [show, setShow] = useState( false );

  const moveToRecipeDetails = ( id ) => {
    history.push( `/recipe/${ id }` );
  };
  const moveChangeCategory = () => {
    history.push( `/recipe/${ item._id }/edit/category` );
  };
  const moveEditRecipe = () => {
    history.push( `/recipe/edit/${ item._id }` );
  };
  const handleDeleteRecipe = () => {
    deleteRecipeCall( item._id );
    setShow( false );
    cleanStoreRecipesCall();
  };

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between">
        <div onClick={ () => moveToRecipeDetails( item._id ) } className="w-100">
          <h5 className="card-title">{item.title}</h5>
        </div>
        <div>
          <DropdownButton as={ ButtonGroup } title="Actions" id="bg-nested-dropdown" onClick={ ( e ) => e.stopPropagation() }>
            <Dropdown.Item eventKey="1" onClick={ moveEditRecipe }>Edit Recipe</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ handleShow }>Delete recipe</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ moveChangeCategory }>Change category</Dropdown.Item>
          </DropdownButton>
          <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
              <Modal.Title>Editing deleting</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete the recipe?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ handleClose }>
                Cancel
              </Button>
              <Button variant="primary" onClick={ handleDeleteRecipe }>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

      </div>
    </div>
  );
};

export default connect( null, {
  deleteRecipeCall: deleteRecipe,
  cleanStoreRecipesCall: cleanStoreRecipes,
} )( RecipeItem );
