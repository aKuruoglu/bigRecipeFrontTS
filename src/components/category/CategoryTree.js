import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './components/MenuItem';
import { getById } from '../../redux/category/action';

const CategoryTree = ( { categoryTree, getByIdCall } ) => {
  const handleCategoryId = ( id ) => {
    getByIdCall( id );
  };
  return (
    <div>
      {
        categoryTree && categoryTree.map( ( item ) => (
          <MenuItem item={ item } key={ item._id } action={ handleCategoryId } />
        ) )
      }
    </div>
  );
};

export default connect( ( state ) => ( {
  categoryTree: state.category.categoriesTree,
  categoryId: state.category.categoryById,
} ), {
  getByIdCall: getById,
} )( CategoryTree );
