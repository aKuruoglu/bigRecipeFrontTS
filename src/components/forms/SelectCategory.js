import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CategoryTree from '../category/CategoryTree';

const SelectCategory = ( { meta, input } ) => {
  const [isOpenTree, setIsOpenTree] = useState( false );
  const [category, setCategory] = useState( {} );
  const { label } = category;

  return (
    <div className="flex-column">
      <div>
        <span>Category: </span>
        <span className="ml-1">{label || 'none'}</span>
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
            <CategoryTree onClickItem={ ( cat ) => {
              input.onChange( cat.key );
              setCategory( cat );
              setIsOpenTree();
            } }
            />
          )}

      </div>
    </div>
  );
};

export default SelectCategory;
