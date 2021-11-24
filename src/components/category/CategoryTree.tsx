import React, { FC, useEffect, useState, ReactNode } from 'react';
import { connect } from 'react-redux';
import TreeMenu from 'react-simple-tree-menu';
import 'react-simple-tree-menu/dist/main.css';
import { ICategoryTree } from '../../redux/category/interface';
import { RootState } from "../../redux/rootReducer";

export type onClickItem = ( { key }: { key: string } ) => void;

export interface CategoryTreeProps {
  categoryTree: ICategoryTree[];
  initialActiveKey: string;
  onClickItem: onClickItem
}

const CategoryTree: FC<CategoryTreeProps> = ( { categoryTree, initialActiveKey, onClickItem } ) => {
  const [tree, setTree] = useState<ReactNode>( null );

  useEffect( () => {
    let options = {};

    if ( !categoryTree!.length ) {
      return;
    }

    if ( initialActiveKey ) {
      const temp = initialActiveKey.split( '/' );
      const initialOpenNodes = temp.splice( 0, temp.length - 1 ).join( '/' );
      options = {
        initialActiveKey,
        initialOpenNodes,
      };
    }

    setTree( <TreeMenu
      data={ categoryTree }
      hasSearch={ false }
      { ...options }
      onClickItem={ onClickItem }
    /> );
  }, [categoryTree, initialActiveKey, onClickItem] );

  return <>
    {tree}
  </>;
};

export default connect(( state: RootState ) => ({
  categoryTree: state.category.categoriesTree,
}))( CategoryTree );
