import React from 'react';
import { hasChildren } from '../../../utils/utils';
import MenuItemSingle from './MenuItemSingle';
import MenuItemMulti from './MenuItemMulti';

const MenuItem = ( { item, action } ) => {
  const Component = hasChildren( item ) ? MenuItemMulti : MenuItemSingle;
  return <Component item={ item } action={ action } />;
};

export default MenuItem;
