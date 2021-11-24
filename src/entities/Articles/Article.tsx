import React, {useEffect, FC} from 'react';
import get from 'lodash-ts/get';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';

import { pageLimit } from '../../config';
import WrapMain from '../../components/WrapMain';
import EntityItem from '../../components/EntityItem';
import { changeRequestStatus } from '../../redux/article/slice';
import { deleteArticle, getAllArticles, getArticlesByCategory } from '../../redux/article/actions';
import { RootState } from "../../redux/rootReducer";
import { IAllArticles, IArticle } from "../../redux/article/interface";
import {
  deleteEntityType,
  getAllEntityType,
  getArticleByCategoryType, IAllEntities,
  Id,
} from "../../redux/common/interface";

interface ArticleProps {
  getAllArticleCall: getAllEntityType<IArticle>,
  allArticles: IAllEntities<IArticle> | null,
  deleteArticleCall: deleteEntityType<IArticle>,
  getArticleByCategoryCall: getArticleByCategoryType<IArticle>,
  status: string,
  changeStatus: ( str: string ) => void,
}

const Article: FC<ArticleProps> = ( {
  getAllArticleCall,
  allArticles,
  deleteArticleCall,
  getArticleByCategoryCall,
  status,
  changeStatus,
}) => {

  const name: string = 'article';
  const { catId, page = '1' }: { catId: Id, page: string } = useParams();
  const history = useHistory();

  const currentPage = +page - 1;

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
      getAllArticleCall( {
        page: currentPage.toString(),
        limit: pageLimit!,
      } );
    } else {
      getArticleByCategoryCall( catId, { page: currentPage.toString(), limit: pageLimit! }  );
    }
  }, [catId, getAllArticleCall, getArticleByCategoryCall, currentPage, status, changeStatus] );

  if ( !allArticles ) {
    return null;
  }
  const { entities, total }: IAllArticles = allArticles;

  let pageCount: number;
  if ( total > +pageLimit! ) {
    pageCount = Math.ceil( total / +pageLimit! - 1 );
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

export default connect( ( state: RootState ) => ( {
  allArticles: state.article.allArticles,
  status: state.article.requestStatus as string,
} ), {
  getAllArticleCall: getAllArticles,
  deleteArticleCall: deleteArticle,
  getArticleByCategoryCall: getArticlesByCategory,
  changeStatus: changeRequestStatus,
} )( Article );
