import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import WrapMain from '../../components/WrapMain';
import RecipeItem from './components/RecipeItem';
import { getAllRecipes } from '../../redux/recipe/actions';
import './recipe.css';
import config from '../../config';

const Recipe = ( { allRecipeCall, allRecipes } ) => {
  const history = useHistory();
  const { pageLimit } = config;
  const [currentPage, setCurrentPage] = useState( 1 );
  const changePage = ( { selected } ) => {
    const page = selected + 1;
    setCurrentPage( page );
  };
  const moveToAddPage = () => {
    history.push( '/recipe/add' );
  };
  useEffect( () => {
    allRecipeCall( {
      page: currentPage,
      limit: pageLimit,
    } );
  }, [allRecipeCall, currentPage, pageLimit] );

  if ( !allRecipes ) {
    return null;
  }

  const { entities, total } = allRecipes;
  const pageCount = Math.ceil( total / pageLimit - 1 );

  return (
    <WrapMain>
      <div className="p-2">
        <Button onClick={ moveToAddPage }>Add recipe</Button>
      </div>
      <div>
        {entities && entities.map( ( item ) => <RecipeItem item={ item } key={ item._id } /> )}
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={ pageCount }
          marginPagesDisplayed={ 2 }
          pageRangeDisplayed={ 3 }
          onPageChange={ changePage }
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>

    </WrapMain>
  );
};

export default connect( ( state ) => ( {
  allRecipes: state.recipe.allRecipes,
} ), {
  allRecipeCall: getAllRecipes,
} )( Recipe );
