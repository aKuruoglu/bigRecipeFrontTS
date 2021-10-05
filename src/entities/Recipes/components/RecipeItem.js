import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RecipeItem = ( { item } ) => {
  const history = useHistory();
  const handleClick = ( id ) => {
    history.push( `/recipe/${ id }` );
  };
  const handleEdit = ( event ) => {
    event.stopPropagation();
    history.push( `/recipe/edit/category/${ item._id }` );
  };

  return (
    <div className="card" onClick={ () => handleClick( item._id ) }>
      <div className="card-body d-flex justify-content-between">
        <div>
          <h5 className="card-title">{item.title}</h5>
        </div>
        <div>
          <Button size="sm" onClick={ handleEdit }>edit category</Button>
        </div>

      </div>
    </div>
  );
};

export default RecipeItem;
