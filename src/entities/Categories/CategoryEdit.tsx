import React, {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editCategories, getById } from '../../redux/category/action';
import CategoryForm from './components/CategoryForm';
import WrapSimple from '../../components/WrapSimple';
import {ICategory} from "../../redux/category/interface";
import {IAction, Id} from "../../redux/common/interface";
import {History} from "history";
import {RootState} from "../../redux/rootReducer";

interface CategoryEditProps {
  getCurrentCategoryCall: (id: Id) => IAction<ICategory>;
  currentCategory: ICategory | null;
  editCategoryCall: ( id: Id, {}: ICategory, history: History ) => IAction<ICategory>;
}

const CategoryEdit: FC<CategoryEditProps> = ( { getCurrentCategoryCall, currentCategory, editCategoryCall } ) => {
  const { id }: { id: Id } = useParams();
  const history: History = useHistory();

  const submit = ( info: ICategory ) => {
    console.log(info)
    editCategoryCall( id, info, history );
  };

  useEffect( () => {
    getCurrentCategoryCall( id );
  }, [id, getCurrentCategoryCall] );

  if ( !currentCategory ) {
    return null;
  }
  return (
    <WrapSimple>
      <CategoryForm onSubmit={ submit } currentCategory={ currentCategory } />
    </WrapSimple>

  );
};

export default connect( ( state: RootState ) => ( {
  currentCategory: state.category.categoryById,
} ), {
  getCurrentCategoryCall: getById,
  editCategoryCall: editCategories,
} )( CategoryEdit );
