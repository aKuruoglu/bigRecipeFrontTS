import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CategoryForm from './components/CategoryForm';
import WrapSimple from '../../components/WrapSimple';
import { addCategory } from '../../redux/category/action';

const CategoryAdd = ( { addCategoryCall } ) => {
  const history = useHistory();
  const submit = ( info ) => {
    addCategoryCall( info, history );
    history.push( '/category' );
  };
  return (
    <WrapSimple>
      <CategoryForm onSubmit={ submit } />
    </WrapSimple>
  );
};

CategoryAdd.propTypes = {
  addCategoryCall: PropTypes.func.isRequired,
};

export default connect( null, {
  addCategoryCall: addCategory,
} )( CategoryAdd );
