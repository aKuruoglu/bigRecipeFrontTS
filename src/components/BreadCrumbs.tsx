import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import get  from 'lodash-ts/get';
import { useHistory } from 'react-router-dom';
import { RootState } from "../redux/rootReducer";
import { BreadTree } from "../redux/category/interface";

interface BreadCrumbsProps {
  entityById?: any
  crumbsArray?: BreadTree
  entity: string
}

const BreadCrumbs: FC<BreadCrumbsProps> = ( { entityById, crumbsArray, entity } ) => {
  const history = useHistory();
  const [bread, setBread] = useState<ReactNode[]>();

  const moveToCategoryId = useCallback( ( id ) => ( ) => {
    history.push( `/${ entity }/category/${ id }` );
  }, [entity, history] );

  useEffect( () => {
    if ( !get( entityById, 'categoryId', null ) ) {
      return;
    }

    let category = crumbsArray![entityById.categoryId];
    const res: ReactNode[] = [];

    while ( category ) {
      res.unshift(
        ( <div
          key={ category._id }
          className="breadcrumb-item crumbs"
          onClick={ moveToCategoryId( category._id ) }
        >
          { category.name }
        </div> ),
      );

      category = category.parent!;
    }

    setBread( res );
  }, [crumbsArray, moveToCategoryId, entityById] );
  return (
    <div className="d-flex mt-2 breadcrumb">
      { bread }
    </div>
  );
};



export default connect( ( state: RootState, { entity }: { entity: string } ) => ( {
  entityById: get( state, `${ entity }.${ entity }ById` ),
  crumbsArray: state.category.breadCrumbsTree,
} ), null )( BreadCrumbs );
