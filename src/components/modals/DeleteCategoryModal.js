import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const DeleteCategoryModal = ( {
  currentCategory, show, handleClose, handleDelete,
} ) => (
  <Modal show={ show } onHide={ handleClose }>
    <Modal.Header closeButton>
      <Modal.Title>Deleting category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>Do you really want to delete the category?</div>
      <div>
        This category has
        {' '}
        {currentCategory.articleCount}
        {' '}
        articles
      </div>
      <div>
        This category has
        {' '}
        {currentCategory.recipeCount}
        {' '}
        recipes
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={ handleClose }>
        Cancel
      </Button>
      <Button variant="danger" onClick={ handleDelete }>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteCategoryModal.propTypes = {
  currentCategory: PropTypes.shape( {
    _id: PropTypes.string,
    parentCategoryId: PropTypes.string,
    name: PropTypes.string,
    articleCount: PropTypes.number,
    recipeCount: PropTypes.number,
  } ).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteCategoryModal;
