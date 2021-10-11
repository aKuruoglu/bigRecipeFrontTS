import React from 'react';
import {
  Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../../redux/recipe/actions';

const RecipeItem = ( { item, deleteRecipeCall } ) => {
  const history = useHistory();
  const handleClick = ( id ) => {
    history.push( `/recipe/${ id }` );
  };
  const moveChangeCategory = () => {
    history.push( `/recipe/edit/category/${ item._id }` );
  };
  const moveEditRecipe = () => {
    history.push( `/recipe/edit/${ item._id }` );
  };
  const handleDeleteRecipe = () => {
    deleteRecipeCall( item._id );
  };

  return (
    <div className="card" onClick={ () => handleClick( item._id ) }>
      <div className="card-body d-flex justify-content-between">
        <div>
          <h5 className="card-title">{item.title}</h5>
        </div>
        <div>
          {/* <Button size="sm" onClick={ handleEdit }>Change category</Button> */}
          {/* <Button size="sm" onClick={ handleEdit }>edit category</Button> */}
          {/* <Button size="sm" onClick={ handleEdit }>edit category</Button> */}
          <DropdownButton as={ ButtonGroup } title="Actions" id="bg-nested-dropdown" onClick={ ( e ) => e.stopPropagation() }>
            <Dropdown.Item eventKey="1" onClick={ moveEditRecipe }>Edit Recipe</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ handleDeleteRecipe }>Delete recipe</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ moveChangeCategory }>Change category</Dropdown.Item>
          </DropdownButton>
        </div>

      </div>
    </div>
  );
};

export default connect( null, {
  deleteRecipeCall: deleteRecipe,
} )( RecipeItem );
