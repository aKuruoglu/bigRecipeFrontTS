import React from 'react';

const MenuItemSingle = ( { item, action } ) => (
  <div>
    <div className="card">
      <div className="card-body" onClick={ () => action( item._id ) }>
        { item.name }
      </div>
    </div>
  </div>
);

export default MenuItemSingle;
