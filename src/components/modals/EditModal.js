import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditModal = ( { catId, handleClose, handleEdit } ) => (
  <Modal show={ !!catId } onHide={ handleClose }>
    <Modal.Header closeButton>
      <Modal.Title>Editing recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you really want to edit the category?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={ handleClose }>
        Cancel
      </Button>
      <Button variant="primary" onClick={ handleEdit }>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditModal;
