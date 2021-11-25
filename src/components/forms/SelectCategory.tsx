import React, {FC, useState} from 'react';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryTree from '../category/CategoryTree';
import useKeysChain from '../../utils/useKeysChain';
import { Id } from "../../redux/common/interface";
import {RootState} from "../../redux/rootReducer";
import {BreadTree, ICategory, ICategoryTree} from "../../redux/category/interface";
import {FieldRenderProps} from "react-final-form";

interface Props extends FieldRenderProps<string, any> {
  treeMap: BreadTree;
}

const SelectCategory: FC<Props> = ( { meta, input, treeMap }: Props ) => {
  const { id }: { id : Id } = useParams();
  const [isOpenTree, setIsOpenTree] = useState<boolean>( false );
  const [category, setCategory] = useState<ICategoryTree>();
  const { value } = input;
  const keysChain: string = useKeysChain( id, treeMap );

  const handleAddCategory = ( cat: any ) => {
    const temp: string[] = cat.key.split( '/' );
    input.onChange( temp[temp.length - 1] );
    setCategory( cat );
    setIsOpenTree(false);
  };


  let parentName;
  if ( value ) {
    parentName = treeMap[value];
  }

  return (
    <div className="flex-column">
      <div>
        <span>Category: </span>
        <span className="ml-1">{category?.label! || ( parentName && parentName.name ) || 'none'}</span>
        <span style={ { color: 'red', marginLeft: '20px' } }>
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </span>
      </div>
      <div>
        {!isOpenTree
          ? (
            <Button onClick={ () => setIsOpenTree( true ) }>
              {category?.label ? 'Change' : 'Select'}
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

export default connect( ( state: RootState ) => ( {
  treeMap: state.category.breadCrumbsTree,
} ) )( SelectCategory );
