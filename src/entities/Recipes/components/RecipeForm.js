import React from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {useParams, useRouteMatch} from 'react-router-dom';
import SelectCategory from '../../../components/forms/SelectCategory';
import Input from '../../../components/forms/Input';

const RecipeForm = ( { currentRecipe = {}, onSubmit } ) => {
  const { id } = useParams();
  const isAddRecipe = useRouteMatch('/recipe/add');

  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={ { ...currentRecipe } }
      validate={ ( values ) => {
        const errors = {};
        if ( !values.title ) {
          errors.title = 'Required';
        }
        if ( !values.description ) {
          errors.description = 'Required';
        }
        if ( isAddRecipe ) {
          if ( !values.categoryId ) {
            errors.categoryId = 'Required';
          }
        }
        return errors;
      } }
      render={ ( { handleSubmit } ) => (
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <Field name="title" component={ Input } defaultValue={ currentRecipe.title } />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <Field name="description" component={ Input } defaultValue={ currentRecipe.description } />
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
