import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editCategories, getById } from '../../redux/category/action';
import CategoryForm from './components/CategoryForm';
import WrapSimple from '../../components/WrapSimple';

const CategoryEdit = ( { getCurrentCategoryCall, currentCategory, editCategoryCall } ) => {
  const { id } = useParams();

  const submit = ( info ) => {
    console.log(info)
    editCategoryCall( id, info );
  };

  useEffect( () => {
    getCurrentCategoryCall( id );
  }, [id, getCurrentCategoryCall] );

  return (
    <WrapSimple>
      <CategoryForm onSubmit={ submit } currentCategory={ currentCategory } />
    </WrapSimple>

  );
};

export default connect( ( state ) => ( {
  currentCategory: state.category.categoryById,
} ), {
  getCurrentCategoryCall: getById,
  editCategoryCall: editCategories,
} )( CategoryEdit );
