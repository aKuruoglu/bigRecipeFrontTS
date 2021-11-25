import React, {FC} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ICategory } from "../../redux/category/interface";

interface Props {
  currentCategory: ICategory;
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteCategoryModal: FC<Props> = ( {
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

export default DeleteCategoryModal;
