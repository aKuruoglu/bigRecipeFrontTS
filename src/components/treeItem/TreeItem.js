import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'react-simple-tree-menu/dist/main.css';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */

const TreeItem = ( { item } ) => {
  const {
    hasNodes, toggleNode, key, isOpen, label,
  } = item;

  const handleKey = () => {
    const temp = key.split( '/' );
    const sendKey = temp.splice( -1, 1 );
    return sendKey;
  };

  const history = useHistory();
  const ToggleIcon = ( { on } ) => (
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

  const handleDelete = ( e ) => {
    e.stopPropagation();
  };

  const moveToEditCategory = () => {
    history.push( `/category/edit/${ handleKey() }` );
  };
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
            <Button onClick={ handleDelete }>Delete</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TreeItem;
