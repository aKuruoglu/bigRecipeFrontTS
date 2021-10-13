import React from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import SelectCategory from '../../../components/forms/SelectCategory';
import Input from '../../../components/forms/Input';

const CategoryForm = ( { currentCategory = {}, onSubmit } ) => {
  const { id } = useParams();

  const initialValue = {
    name: currentCategory.name,
    parentCategoryId: currentCategory.parentCategoryId,
  };

  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={ { ...initialValue } }
      validate={ ( values ) => {
        const errors = {};
        if ( !values.name ) {
          errors.name = 'Required';
        }
        if ( currentCategory.parentCategoryId ) {
          if ( !values.parentCategoryId ) {
            errors.parentCategoryId = 'isRequired';
          }
        }
        return errors;
      } }
      render={ ( { handleSubmit } ) => (
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label>Title</label>
            <Field name="name" component={ Input } defaultValue={ currentCategory.name } />
          </div>

          {id && (
            <div className="mb-3  align-items-center">
              <Field name="parentCategoryId" component={ SelectCategory } defaultValue={ currentCategory.parentCategoryId } />
            </div>
          )}
          <Button type="submit">Save</Button>
        </form>
      ) }
    />
  );
};

export default connect( ( state ) => ( {
  categories: state.category.categories,
} ) )( CategoryForm );
