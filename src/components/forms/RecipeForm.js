import React from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';

const RecipeForm = ( { recipeById = {}, onSubmit } ) => (
  <Form
    onSubmit={ onSubmit }
    initialValues={ { ...recipeById } }
    render={ ( { handleSubmit } ) => (
      <form onSubmit={ handleSubmit }>
        <div className={'mb-3'}>
          <label>Title</label>
          <Field name="title" component="input" defaultValue={ recipeById.title } />
        </div>
        <div className={'mb-3'}>
          <label>Description</label>
          <Field name="description" component="input" defaultValue={ recipeById.description } />
        </div>

        <Button type="submit">Save</Button>
      </form>
    ) }
  />
);

export default RecipeForm;
