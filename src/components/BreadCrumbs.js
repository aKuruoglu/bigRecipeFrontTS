import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

const BreadCrumbs = ( { recipeById, crumbsArray } ) => {
  const history = useHistory();
  const [bread, setBread] = useState();

  const moveToCategoryId = useCallback( ( id ) => ( ) => {
    history.push( `/category/${ id }` );
  }, [history] );

  useEffect( () => {
    if ( !get( recipeById, 'categoryId', null ) ) {
      return;
    }

    let category = crumbsArray[recipeById.categoryId];
    const res = [];

    while ( category ) {
      res.unshift( ( <div
        key={ category._id }
        className="breadcrumb-item crumbs"
        onClick={ moveToCategoryId( category._id ) }
      >
        {category.name}
      </div> ) );

      category = category.parent;
    }

    setBread( res );
  }, [crumbsArray, moveToCategoryId, recipeById] );
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
