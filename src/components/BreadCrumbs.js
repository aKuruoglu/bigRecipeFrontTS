import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

const BreadCrumbs = ( { entityById, crumbsArray, entity } ) => {
  const history = useHistory();
  const [bread, setBread] = useState();

  const moveToCategoryId = useCallback( ( id ) => ( ) => {
    history.push( `/${ entity }/category/${ id }` );
  }, [entity, history] );

  useEffect( () => {
    if ( !get( entityById, 'categoryId', null ) ) {
      return;
    }

    let category = crumbsArray[entityById.categoryId];
    const res = [];

    while ( category ) {
      res.unshift(
        ( <div
          key={ category._id }
          className="breadcrumb-item crumbs"
          onClick={ moveToCategoryId( category._id ) }
        >
          {category.name}
        </div> ),
      );

      category = category.parent;
    }

    setBread( res );
  }, [crumbsArray, moveToCategoryId, entityById] );
  return (
    <div className="d-flex mt-2 breadcrumb">
      {bread}
    </div>
  );
};

BreadCrumbs.propTypes = {
  crumbsArray: PropTypes.objectOf( PropTypes.object ).isRequired,
  entity: PropTypes.string.isRequired,
};

export default connect( ( state, { entity } ) => ( {
  entityById: get( state, `${ entity }.${ entity }ById` ),
  crumbsArray: state.category.breadCrumbsTree,
} ), null )( BreadCrumbs );
