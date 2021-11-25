import React, {FC} from 'react';
import PropTypes from 'prop-types';
import TreeMenu from 'react-simple-tree-menu';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TreeItem from '../../components/treeItem/TreeItem';
import {ICategoryTree} from "../../redux/category/interface";
import {RootState} from "../../redux/rootReducer";

interface CategoryProps {
  treeData: ICategoryTree[]
}

const Category: FC<CategoryProps> = ( { treeData } ) => {
  const history = useHistory();
  const moveToAdd = () => {
    history.push( '/category/add' );
  };
  return (
    <div className="container mt-3 h-100">
      <div className="row h-100">

        <div>
          <Button onClick={ moveToAdd }>Add category</Button>
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
};

export default connect( ( state: RootState ) => ( {
  treeData: state.category.categoriesTree,
} ) )( Category );
