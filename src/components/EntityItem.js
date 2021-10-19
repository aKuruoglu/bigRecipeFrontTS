import React, { useState } from 'react';
import {
  ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DeleteModal from './modals/DeleteModal';

const EntityItem = ( {
  item, deleteEntityCall, entity,
} ) => {
  const history = useHistory();
  const [show, setShow] = useState( false );

  const moveToEntityDetails = ( id ) => {
    history.push( `/${ entity }/${ id }` );
  };
  const moveChangeCategory = () => {
    history.push( `/${ entity }/${ item._id }/edit/category` );
  };
  const moveEditRecipe = () => {
    history.push( `/${ entity }/edit/${ item._id }` );
  };
  const handleDelete = () => {
    deleteEntityCall( item._id );
    setShow( false );
  };

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between">
        <div onClick={ () => moveToEntityDetails( item._id ) } className="w-100">
          <h5 className="card-title">{item.title}</h5>
        </div>
        <div>
          <DropdownButton as={ ButtonGroup } title="Actions" id="bg-nested-dropdown" onClick={ ( e ) => e.stopPropagation() }>
            <Dropdown.Item eventKey="1" onClick={ moveEditRecipe }>
              Edit
              {' '}
              { entity }
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ handleShow }>
              Delete
              {' '}
              { entity }
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={ moveChangeCategory }>Change category</Dropdown.Item>
          </DropdownButton>
          <DeleteModal
            entity={ entity }
            handleDelete={ handleDelete }
            open={ show }
            handleClose={ handleClose }
          />
        </div>

      </div>
    </div>
  );
};

export default EntityItem;
