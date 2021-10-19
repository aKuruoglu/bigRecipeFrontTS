import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  useHistory, useParams,
} from 'react-router-dom';

import CategoryTree from './category/CategoryTree';
import { getRecipesByCategory } from '../redux/recipe/actions';
import useKeysChain from '../utils/useKeysChain';

const WrapMain = ( { children, crumbsMap, entity } ) => {
  const history = useHistory();
  const { catId } = useParams();

  const handleClick = useCallback( ( { key } ) => {
    const sendKey = key
      .split( '/' )
      .pop();
    history.push( `/${ entity }/category/${ sendKey }` );
  }, [entity, history] );

  const keysChain = useKeysChain( catId, crumbsMap );

  return (
    <div className="container-md h-100">
      <div className="row h-100">

        <nav className="col-lg-4 col-md-5 col-sm-6">
          <CategoryTree onClickItem={ handleClick } initialActiveKey={ keysChain } />
        </nav>

        <div className="col-lg-8 col-md-7 col-sm-6">
          { children }
        </div>

      </div>
    </div>
  );
};

export default connect( ( state ) => ( {
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getRecipesByCategoryCall: getRecipesByCategory,
} )( WrapMain );
