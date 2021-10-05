import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

const BreadCrumbs = ( { recipeById, crumbsArray } ) => {
  const [bread, setBread] = useState();
  useEffect( () => {
    if ( !get( recipeById, 'categoryId', null ) ) {
      return;
    }

    let category = crumbsArray.find( ( item ) => item._id === recipeById.categoryId );
    const res = [];

    while ( category ) {
      res.unshift( ( <div key={ category._id } className="breadcrumb-item">{category.name}</div> ) );

      category = category.parent;
    }

    setBread( res );
  }, [crumbsArray, recipeById] );
  return (
    <div className="d-flex mt-2 breadcrumb">
      {bread}
    </div>
  );
};

export default connect( ( state ) => ( {
  recipeById: state.recipe.recipeById,
  crumbsArray: state.category.breadCrumbsTree,
} ), null )( BreadCrumbs );
