import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryTree from './category/CategoryTree';
import { getRecipesByCategory } from '../redux/recipe/actions';

const WrapMain = ( { children } ) => {
  const history = useHistory();

  const handleClick = ( { key } ) => {
    const sendKey = key
      .split( '/' )
      .pop();
    history.push( `/category/${ sendKey }` );
  };
  return (
    <div className="container h-100">
      <div className="row h-100">

        <nav className="col-md-3">
          <CategoryTree onClickItem={ handleClick } />
        </nav>

        <main className="col-md-9">
          { children }
        </main>

      </div>
    </div>
  );
};

export default connect( null, {
  getRecipesByCategoryCall: getRecipesByCategory,
} )( WrapMain );
