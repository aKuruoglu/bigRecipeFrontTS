import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  useHistory, useParams,
} from 'react-router-dom';

import CategoryTree from './category/CategoryTree';
import { getRecipesByCategory } from '../redux/recipe/actions';

const WrapMain = ( { children, crumbsMap, entity } ) => {
  const history = useHistory();
  const { catId } = useParams();

  const handleClick = useCallback( ( { key } ) => {
    const sendKey = key
      .split( '/' )
      .pop();
    history.push( `/${ entity }/category/${ sendKey }` );
  }, [entity, history] );

  const res = [];
  if ( catId ) {
    let category = crumbsMap[catId];

    while ( category ) {
      res.unshift( category._id );
      category = category.parent;
    }
  }

  return (
    <div className="container-md h-100">
      <div className="row h-100">

        <nav className="col-lg-4 col-md-5 col-sm-6">
          <CategoryTree onClickItem={ handleClick } initialActiveKey={ res.join( '/' ) } />
        </nav>

        <main className="col-lg-8 col-md-7 col-sm-6">
          { children }
        </main>

      </div>
    </div>
  );
};

export default connect( ( state ) => ( {
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getRecipesByCategoryCall: getRecipesByCategory,
} )( WrapMain );
