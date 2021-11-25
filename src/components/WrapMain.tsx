import React, { FC, ReactElement, ReactNode, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  useHistory, useParams,
} from 'react-router-dom';

import CategoryTree, { onClickItem } from './category/CategoryTree';
import { getRecipesByCategory } from '../redux/recipe/actions';
import useKeysChain from '../utils/useKeysChain';
import { Id } from '../redux/common/interface';
import { BreadTree } from '../redux/category/interface';
import {RootState} from '../redux/rootReducer';

interface WrapMainProps {
  crumbsMap?: BreadTree;
  entity: string;
  children: ReactElement | ReactNode;
}

const WrapMain: FC<WrapMainProps> = ( {
  children,
  crumbsMap,
  entity
} ) => {
  const history = useHistory();
  const { catId }: { catId: Id }= useParams();

  const handleClick = useCallback<onClickItem>( ( { key }: { key: string } ) => {
    const sendKey = key
      .split( '/' )
      .pop();
    history.push( `/${ entity }/category/${ sendKey }` );
  }, [entity, history] );

  let keysChain: string = '';

  if (crumbsMap) {
    keysChain = useKeysChain( catId, crumbsMap );
  }

  return (
    <div className="container-md h-100">
      <div className="row h-100">

        <nav className="col-lg-4 col-md-5 col-sm-6">
          <CategoryTree initialActiveKey={ keysChain } onClickItem={ handleClick } />
        </nav>

        <div className="col-lg-8 col-md-7 col-sm-6">
          { children }
        </div>

      </div>
    </div>
  );
};

export default connect( ( state: RootState ) => ( {
  crumbsMap: state.category.breadCrumbsTree,
} ), {
  getRecipesByCategoryCall: getRecipesByCategory,
} )( WrapMain );
