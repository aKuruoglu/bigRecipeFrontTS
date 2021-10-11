import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { get } from 'lodash';

import WrapMain from '../../components/WrapMain';
import RecipeItem from './components/RecipeItem';
import { getAllRecipes, getRecipesByCategory } from '../../redux/recipe/actions';
import './recipe.css';
import config from '../../config';

const { pageLimit } = config;

const Recipe = ( { allRecipeCall, getRecipesByCategoryCall, allRecipes } ) => {
  const history = useHistory();

  const { catId, page = 1 } = useParams();

  const currentPage = +page - 1;

  const changePage = ( { selected } ) => {
    const pageNumber = +selected + 1;
    if ( pageNumber !== +page ) {
      history.push( `/recipe/page/${ pageNumber }` );
    }
  };

  const moveToAddPage = () => {
    history.push( '/recipe/add' );
  };

  useEffect( () => {
    if ( !catId ) {
      allRecipeCall( {
        page: currentPage,
        limit: pageLimit,
      } );
    } else {
      getRecipesByCategoryCall( catId, currentPage, pageLimit );
    }
  }, [allRecipeCall, catId, page, getRecipesByCategoryCall, currentPage] );

  if ( !allRecipes ) {
    return null;
  }

  const { entities, total } = allRecipes;

  let pageCount;
  if ( total > 10 ) {
    pageCount = Math.ceil( total / pageLimit - 1 );
  } else {
    pageCount = 1;
  }

  return (
    <WrapMain>
      <div className="p-2">
        <Button onClick={ moveToAddPage }>Add recipe</Button>
      </div>
      <div>
        {get( entities, 'length', 0 ) > 0
          ? entities.map( ( item ) => <RecipeItem item={ item } key={ item._id } /> )
          : <p className="text-center mb-5">Data do not exist</p>}
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={ pageCount }
          marginPagesDisplayed={ 3 }
          pageRangeDisplayed={ 3 }
          onPageChange={ changePage }
          containerClassName="pagination"
          activeClassName="active"
          initialPage={ currentPage }
          forcePage={ currentPage }
        />
      </div>

    </WrapMain>
  );
};

export default connect( ( state ) => ( {
  allRecipes: state.recipe.allRecipes,
} ), {
  allRecipeCall: getAllRecipes,
  getRecipesByCategoryCall: getRecipesByCategory,
} )( Recipe );
