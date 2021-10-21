import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editCategories, getById } from '../../redux/category/action';
import CategoryForm from './components/CategoryForm';
import WrapSimple from '../../components/WrapSimple';

const CategoryEdit = ( {
  getCurrentCategoryCall, currentCategory, editCategoryCall, currentCategoryInStore,
} ) => {
  const { id } = useParams();
  const history = useHistory();

  const submit = ( info ) => {
    editCategoryCall( id, info, history );
  };

  useEffect( () => {
    getCurrentCategoryCall( id );
  }, [id, getCurrentCategoryCall] );

  if ( !currentCategoryInStore ) {
    return null;
  }
  return (
    <WrapSimple>
      <CategoryForm onSubmit={ submit } currentCategory={ currentCategory } />
    </WrapSimple>

  );
};

CategoryEdit.propTypes = {
  currentCategory: PropTypes.shape( {
    _id: PropTypes.string,
    name: PropTypes.string,
    parentCategoryId: PropTypes.oneOfType( [
      PropTypes.oneOf( [null] ),
      PropTypes.string,
    ] ),
    articlesCount: PropTypes.number,
    recipesCount: PropTypes.number,
  } ),
  getCurrentCategoryCall: PropTypes.func.isRequired,
  editCategoryCall: PropTypes.func.isRequired,
};

CategoryEdit.defaultProps = {
  currentCategory: {},
};

export default connect( ( state ) => ( {
  currentCategory: state.category.categoryById,
  currentCategoryInStore: !!state.category.categoryById,
} ), {
  getCurrentCategoryCall: getById,
  editCategoryCall: editCategories,
} )( CategoryEdit );
