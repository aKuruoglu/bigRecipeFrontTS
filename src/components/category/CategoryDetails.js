import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import MultiLevelSelect from '../MultiLevelSelect';
import { editCategories } from '../../redux/category/action';

const CategoryDetails = ( { categoryId, categories } ) => {
  const [disable, setDisable] = useState( true );
  const handleEdit = () => {
    setDisable( false );
  };
  return (
    <div className="d-flex flex-column justify-content-between h-50">
      <div>
        <div>
          <label htmlFor="name" className="mb-1 mr-3">Category name:</label>
          <input
            type="text"
            id="name"
            disabled={ disable }
            className="form-control mb-3"
            defaultValue={ categoryId.name }
          />
        </div>

        <div>
          <label htmlFor="article" className="mb-1 mr-3">Articles:</label>
          <input
            type="text"
            id="article"
            disabled
            className="form-control mb-3"
            defaultValue={ categoryId.articlesCount }
          />
        </div>

        <div>
          <label htmlFor="recipe" className="mb-1 mr-3">Resipes:</label>
          <input
            type="text"
            id="recipe"
            disabled
            className="form-control mb-3"
            defaultValue={ categoryId.recipesCount }
          />
        </div>

        <MultiLevelSelect
          categories={ categories }
          categoryById={ categoryId }
          isDisabled={ disable }
        />

      </div>
      <div>
        <Button
          variant="success"
          onClick={ handleEdit }
        >
          {disable ? 'Edit category' : 'Save'}
        </Button>
        {' '}
        <Button>Add category</Button>
      </div>
    </div>
  );
};

export default connect( ( state ) => ( {
  categoryId: state.category.categoryById,
  categories: state.category.categoriesTree,
} ), {
  editCategoriesCall: editCategories,
} )( CategoryDetails );
