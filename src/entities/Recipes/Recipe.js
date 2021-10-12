import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';

import './recipe.css';
import { pageLimit } from '../../config';
import WrapMain from '../../components/WrapMain';
import EntityItem from '../../components/EntityItem';
import {
  deleteRecipe, getAllRecipes, getRecipesByCategory,
} from '../../redux/recipe/actions';
import { cleanStoreRecipes } from '../../redux/recipe/slice';

const Recipe = ( {
  allRecipeCall, getRecipesByCategoryCall, allRecipes, deleteRecipeCall, cleanStoreRecipesCall,
} ) => {
  const history = useHistory();
  const name = 'recipe';
  const { catId, page = 1 } = useParams();

  const currentPage = +page - 1;

  const changePage = ( { selected } ) => {
    const pageNumber = +selected + 1;
    if ( pageNumber !== +page ) {
      if ( !catId ) {
        history.push( `/${ name }/page/${ pageNumber }` );
      } else {
        history.push( `/${ name }/category/${ catId }/page/${ pageNumber }` );
      }
    }
  };

  const moveToAddPage = () => {
    history.push( `/${ name }/add` );
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
    <WrapMain entity={ name }>
      <div className="p-2">
        <Button onClick={ moveToAddPage }>Add recipe</Button>
      </div>
      <div>
        {get( entities, 'length', 0 ) > 0
          ? entities.map( ( item ) => (
            <EntityItem
              item={ item }
              key={ item._id }
              entity={ name }
              deleteEntityCall={ deleteRecipeCall }
              cleanStoreEntityCall={ cleanStoreRecipesCall }
            />
          ) )
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
  deleteRecipeCall: deleteRecipe,
  cleanStoreRecipesCall: cleanStoreRecipes,
} )( Recipe );
