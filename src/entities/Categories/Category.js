import React from 'react';
import TreeMenu from 'react-simple-tree-menu';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TreeItem from '../../components/treeItem/TreeItem';

const Category = ( { treeData } ) => (
  <div className="container mt-3 h-100">
    <div className="row h-100">

      <div>
        <Button>Add category</Button>
        <TreeMenu data={ treeData }>
          {( { items } ) => (
            <>
              {items.map( ( item ) => (
                <TreeItem key={ item.key } item={ item } />
              ) )}
            </>

          )}
        </TreeMenu>
      </div>

    </div>

  </div>
);

export default connect( ( state ) => ( {
  treeData: state.category.categoriesTree,
} ) )( Category );
