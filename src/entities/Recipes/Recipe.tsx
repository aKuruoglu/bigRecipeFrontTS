import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash-ts/get';
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
import { changeRequestStatus, cleanStoreRecipes } from '../../redux/recipe/slice';
import {
  deleteEntityType,
  getAllEntityType,
  getArticleByCategoryType,
  IAllEntities,
  Id,
  Pagination
} from "../../redux/common/interface";
import { IRecipe } from "../../redux/recipe/interface";
import { RootState } from "../../redux/rootReducer";

interface RecipeProps {
  allRecipeCall: getAllEntityType<IRecipe>,
  getRecipesByCategoryCall: getArticleByCategoryType<IRecipe>,
  allRecipes: IAllEntities<IRecipe> | null,
  deleteRecipeCall: deleteEntityType<IRecipe>,
  cleanStoreRecipesCall: () => void,
  status: string,
  changeStatus: (str: string) => void,
}

const Recipe: FC<RecipeProps> = ( {
  allRecipeCall,
  getRecipesByCategoryCall,
  allRecipes,
  deleteRecipeCall,
  cleanStoreRecipesCall,
  status,
  changeStatus,
} ) => {
  const history = useHistory();
  const name = 'recipe';
  const { catId, page = '1' }: { catId: string, page: string } = useParams();

  const currentPage: number = +page - 1;

  const changePage = ( { selected }: { selected: number } ) => {
    const pageNumber: number = +selected + 1;
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
    if ( status === 'success' ) {
      changeStatus( '' );
      return;
    }

    if ( !catId ) {
      allRecipeCall( {
        page: currentPage.toString(),
        limit: pageLimit!,
      } );
    } else {
      getRecipesByCategoryCall( catId, { page: currentPage.toString(), limit: pageLimit! } );
    }
  }, [allRecipeCall, catId, getRecipesByCategoryCall, currentPage, status, changeStatus] );

  if ( !allRecipes ) {
    return null;
  }

  const { entities, total }: IAllEntities<IRecipe> = allRecipes;

  let pageCount: number;
  if ( total > 10 ) {
    pageCount = Math.ceil( total / +pageLimit! - 1 );
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
              // cleanStoreEntityCall={ cleanStoreRecipesCall }
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

export default connect( ( state: RootState ) => ( {
  allRecipes: state.recipe.allRecipes,
  status: state.recipe.requestStatus,
} ), {
  allRecipeCall: getAllRecipes,
  getRecipesByCategoryCall: getRecipesByCategory,
  deleteRecipeCall: deleteRecipe,
  cleanStoreRecipesCall: cleanStoreRecipes,
  changeStatus: changeRequestStatus,
} )( Recipe );
