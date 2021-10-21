import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryTree from '../category/CategoryTree';
import useKeysChain from '../../utils/useKeysChain';

const SelectCategory = ( { meta, input, treeMap } ) => {
  const { id } = useParams();
  const [isOpenTree, setIsOpenTree] = useState( false );
  const [category, setCategory] = useState( {} );
  const { label } = category;
  const { value } = input;

  const keysChain = useKeysChain( id, treeMap );

  const handleAddCategory = ( cat ) => {
    const temp = cat.key.split( '/' );
    input.onChange( temp[temp.length - 1] );
    setCategory( cat );
    setIsOpenTree();
  };

  let parentName;
  if ( value ) {
    parentName = treeMap[value];
  }

  return (
    <div className="flex-column">
      <div>
        <span>Category: </span>
        <span className="ml-1">{label || ( parentName && parentName.name ) || 'none'}</span>
        <span style={ { color: 'red', marginLeft: '20px' } }>
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </span>
      </div>
      <div>
        {!isOpenTree
          ? (
            <Button onClick={ () => setIsOpenTree( true ) }>
              {label ? 'Change' : 'Select'}
              {' '}
              Category
            </Button>
          )
          : (
            <CategoryTree onClickItem={ handleAddCategory } initialActiveKey={ keysChain } />
          )}

      </div>
    </div>
  );
};

export default connect( ( state ) => ( {
  treeMap: state.category.breadCrumbsTree ? state.category.breadCrumbsTree : {},
} ) )( SelectCategory );
