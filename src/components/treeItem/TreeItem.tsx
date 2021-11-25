import React, {FC, useCallback, useState, ChangeEvent, MouseEvent} from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'react-simple-tree-menu/dist/main.css';
import { connect } from 'react-redux';
import { deleteCategory, getById } from '../../redux/category/action';
import DeleteCategoryModal from '../modals/DeleteCategoryModal';
import { RootState } from "../../redux/rootReducer";
import { deleteEntityType, IAction, Id } from "../../redux/common/interface";
import { ICategory } from "../../redux/category/interface";

/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */

interface Props {
  item: any
  deleteCategoryCall: deleteEntityType<ICategory>;
  categoryById: ICategory | null;
  fetchCategoryById: ( id: Id ) => IAction<ICategory>;
}

const TreeItem: FC<Props> = ( {
  item, deleteCategoryCall, categoryById, fetchCategoryById,
} ) => {
  const {
    hasNodes, toggleNode, key, isOpen, label,
  } = item;
  const history = useHistory();
  const [show, setShow] = useState( false );

  const handleKey = useCallback( () => {
    const temp = key.split( '/' );
    return temp.splice( -1, 1 );
  }, [key] );

  const getCategory = useCallback( () => {
    fetchCategoryById( handleKey() );
  }, [fetchCategoryById, handleKey] );

  const handleClose = () => setShow( false );
  const handleShow = () => {
    getCategory();
    setShow( true );
  };

  const handleDelete = ( e: MouseEvent<HTMLElement> ) => {
    e.stopPropagation();
    deleteCategoryCall( handleKey() );
    setShow( false );
  };

  const moveToEditCategory = () => {
    history.push( `/category/edit/${ handleKey() }` );
  };

  const ToggleIcon = ( { on }: {on: boolean} ) => (
    <span
      style={ { marginRight: 10 } }
      onClick={ ( e ) => {
        hasNodes && toggleNode && toggleNode();
        e.stopPropagation();
      } }
    >
      {on ? '-' : '+'}
    </span>
  );
  // if ( !categoryById ) {
  //   return null;
  // }

  return (
    <div className="rstm-tree-item">
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <div>
            {hasNodes && <ToggleIcon on={ isOpen } />}
            <span>{label}</span>
          </div>
          <div>

            <Button variant="success" onClick={ moveToEditCategory }>Edit</Button>
            {' '}
            <Button onClick={ handleShow }>Delete</Button>
          </div>
        </div>

      </div>
      <DeleteCategoryModal
        handleDelete={ handleDelete }
        currentCategory={ categoryById }
        show={ show }
        handleClose={ handleClose }
      />
    </div>
  );
};


export default connect( ( state: RootState ) => ( {
  categoryById: state.category.categoryById,
} ), {
  deleteCategoryCall: deleteCategory,
  fetchCategoryById: getById,
} )( TreeItem );
