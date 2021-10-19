import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editCategories, getById } from '../../redux/category/action';
import CategoryForm from './components/CategoryForm';
import WrapSimple from '../../components/WrapSimple';

const CategoryEdit = ( {
  getCurrentCategoryCall, currentCategory, editCategoryCall,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  const submit = ( info ) => {
    editCategoryCall( id, info, history );
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
  errorMessage: state.common.errorMessage,
} ), {
  getCurrentCategoryCall: getById,
  editCategoryCall: editCategories,
} )( CategoryEdit );
