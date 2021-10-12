import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';
import CategoryTree from '../../components/category/CategoryTree';
import { getById, updateRecipeCategory } from '../../redux/recipe/actions';

const RecipeEditCategory = ( {
  categoryId,
  getByIdCall,
  crumbsMap,
  updateRecipeCategoryCall,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  const [catId, setCatId] = useState( null );

  useEffect( () => {
    getByIdCall( id );
  }, [getByIdCall, id] );

  if ( !categoryId ) {
    return null;
  }

  let category = crumbsMap[categoryId];
  const res = [];

  while ( category ) {
    res.unshift( category._id );
    category = category.parent;
  }

  const keysChain = res.join( '/' );

  if ( !keysChain ) {
    return null;
  }

  const handleClose = () => setCatId( null );
  const handleShow = ( { key } ) => setCatId( key );

  const handleEditCategory = () => {
    const sendKey = catId
      .split( '/' )
      .pop();
    updateRecipeCategoryCall( id, sendKey );
    history.push( '/recipe' );
  };

  return (
    <>
      <CategoryTree initialActiveKey={ res.join( '/' ) } onClickItem={ handleShow } />
      <Modal show={ !!catId } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Editing recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to edit the category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Cancel
          </Button>
          <Button variant="primary" onClick={ handleEditCategory }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default connect( ( state ) => ( {
  categoryId: get( state, 'recipe.recipeById.categoryId' ),
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getByIdCall: getById,
  updateRecipeCategoryCall: updateRecipeCategory,
} )( RecipeEditCategory );
