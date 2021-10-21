import React, { useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pageLimit } from '../../config';
import WrapMain from '../../components/WrapMain';
import EntityItem from '../../components/EntityItem';
import { changeRequestStatus } from '../../redux/article/slice';
import { deleteArticle, getAllArticles, getArticlesByCategory } from '../../redux/article/actions';

const Article = ( {
  getAllArticleCall,
  allArticles,
  articleInStore,
  deleteArticleCall,
  getArticleByCategoryCall,
  status,
  changeStatus,
} ) => {
  const name = 'article';
  const { catId, page = 1 } = useParams();
  const history = useHistory();

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
    if ( status === 'success' ) {
      changeStatus( '' );
      return;
    }

    if ( !catId ) {
      getAllArticleCall( {
        page: currentPage,
        limit: pageLimit,
      } );
    } else {
      getArticleByCategoryCall( catId, currentPage, pageLimit );
    }
  }, [catId, getAllArticleCall, getArticleByCategoryCall, currentPage, status, changeStatus] );

  if ( !articleInStore ) {
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
    <WrapMain entity={ name }>
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
            <EntityItem
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

Article.propTypes = {
  allArticles: PropTypes.shape( {
    entities: PropTypes.arrayOf( PropTypes.shape( {
      _id: PropTypes.string,
      categoryId: PropTypes.string,
      description: PropTypes.string,
      mainText: PropTypes.string,
      title: PropTypes.string,
    } ) ),
    total: PropTypes.number,
  } ).isRequired,
  articleInStore: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  getAllArticleCall: PropTypes.func.isRequired,
  deleteArticleCall: PropTypes.func.isRequired,
  getArticleByCategoryCall: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default connect( ( state ) => ( {
  allArticles: state.article.allArticles ? state.article.allArticles : {},
  articleInStore: !!state.article.allArticles,
  status: state.article.requestStatus,
} ), {
  getAllArticleCall: getAllArticles,
  deleteArticleCall: deleteArticle,
  getArticleByCategoryCall: getArticlesByCategory,
  changeStatus: changeRequestStatus,
} )( Article );
