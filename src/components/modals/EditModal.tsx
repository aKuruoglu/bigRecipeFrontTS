import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  catId: boolean;
  handleClose: () => void;
  handleEdit: () => void;
}

const EditModal: FC<Props> = ( { catId, handleClose, handleEdit } ) => (
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
