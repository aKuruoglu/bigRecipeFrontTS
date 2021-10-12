import React from 'react';
import CategoryDetails from '../../components/category/CategoryDetails';
import CategoryTree from '../../components/category/CategoryTree';

const Category = () => (
  <div className="container mt-3 h-100">
    <div className="row h-100">

      <div className="col-md-3">
        <CategoryTree />
      </div>

      <div className="col-md-9">
        <CategoryDetails />
      </div>

    </div>

  </div>
);

export default Category;
