import React from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import Input from './Input';

const RecipeForm = ( { recipeById = {}, onSubmit } ) => {
  const { id } = useParams();

  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={ { ...recipeById } }
      validate={ ( values ) => {
        const errors = {};
        if ( !values.title ) {
          errors.title = 'Required';
        }
        if ( !values.description ) {
          errors.description = 'Required';
        }
        if ( !values.categoryId ) {
          errors.categoryId = 'isRequired';
        }
        return errors;
      } }
      render={ ( { handleSubmit } ) => (
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label>Title</label>
            <Field name="title" component={ Input } defaultValue={ recipeById.title } />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <Field name="description" component={ Input } defaultValue={ recipeById.description } />
          </div>
          {!id && (
          <div className="mb-3  align-items-center">
            <Field name="categoryId" component={ SelectCategory } />
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
} ) )( RecipeForm );
