import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import WrapMain from '../../components/WrapMain';
import { deleteArticle, getAllArticles, getArticlesByCategory } from '../../redux/article/actions';
import { pageLimit } from '../../config';
import RecipeItem from '../Recipes/components/RecipeItem';

const Article = ( {
  getAllArticleCall, allArticles, deleteArticleCall, getArticleByCategoryCall,
} ) => {
  const name = 'article';
  const { catId, page = 1 } = useParams();
  const history = useHistory();

  const currentPage = +page - 1;

  const changePage = ( { selected } ) => {
    const pageNumber = +selected + 1;
    if ( pageNumber !== +page ) {
      history.push( `/${ name }/page/${ pageNumber }` );
    }
  };

  const moveToAddPage = () => {
    console.log( '>move to add page' );
  };

  useEffect( () => {
    if ( !catId ) {
      getAllArticleCall( {
        page,
        limit: pageLimit,
      } );
    } else {
      getArticleByCategoryCall();
    }
  }, [catId, getAllArticleCall, getArticleByCategoryCall, page, currentPage] );

  if ( !allArticles ) {
    return null;
  }
  const { entities, total } = allArticles;

  let pageCount;
  if ( total > pageLimit ) {
    pageCount = Math.ceil( total / pageLimit - 1 );
  } else {
    pageCount = 1;
  }

  return (
    <WrapMain entity={name}>
      <div className="p-2">
        <Button onClick={ moveToAddPage }>
          Add
          {' '}
          {' '}
          {name}
        </Button>
      </div>
      <div>
        {get( entities, 'length', 0 ) > 0
          ? entities.map( ( item ) => (
            <RecipeItem
              item={ item }
              key={ item._id }
              entity={ name }
              deleteEntityCall={ deleteArticleCall }
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
  allArticles: state.article.allArticles,
} ), {
  getAllArticleCall: getAllArticles,
  deleteArticleCall: deleteArticle,
  getArticleByCategoryCall: getArticlesByCategory,
} )( Article );
