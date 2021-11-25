import React, {FC} from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { useParams, useRouteMatch } from 'react-router-dom';
import SelectCategory from '../../../components/forms/SelectCategory';
import Input from '../../../components/forms/Input';
import { ICategory } from "../../../redux/category/interface";
import { Id } from "../../../redux/common/interface";

interface CategoryFormProps {
  currentCategory?: ICategory | null;
  onSubmit: ({}: ICategory) => void;
}

const CategoryForm: FC<CategoryFormProps> = ( { currentCategory = {}, onSubmit } ) => {
  const { id }: { id: Id } = useParams();
  const match = useRouteMatch( '/category/edit/:id' );
  const initialValue = {
    name: currentCategory!.name,
    parentCategoryId: currentCategory!.parentCategoryId,
  };

  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={ { ...initialValue } }
      validate={ ( values ) => {
        const errors: { [key: string]: string } = {};
        if ( !values.name ) {
          errors.name = 'Required';
        }
        if ( currentCategory!.parentCategoryId ) {
          if ( !values.parentCategoryId ) {
            errors.parentCategoryId = 'isRequired';
          }
        }
        return errors;
      } }
      render={ ( { handleSubmit } ) => (
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label htmlFor="name">Title</label>
            <Field<string> name="name" component={ Input } defaultValue={ currentCategory!.name } />
          </div>

          {!id && (
            <div className="mb-3  align-items-center">
              <Field name="parentCategoryId" component={ SelectCategory } defaultValue={ currentCategory!.parentCategoryId } />
            </div>
          )}
          {match && (
            <div className="mb-3  align-items-center">
              <Field name="parentCategoryId" component={ SelectCategory } defaultValue={ currentCategory!.parentCategoryId || null } />
            </div>
          )}
          <Button type="submit">Save</Button>
        </form>
      ) }
    />
  );
};

export default CategoryForm;
