/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import { cloneDeep } from 'lodash';
import { buildCategoryTree, replaceKeysDeep } from '../../utils/utils';
import { ICategory, ICategoryTree, BreadTree } from './interface';

interface InitialState {
  categories: ICategory[];
  categoriesTree: ICategoryTree[];
  breadCrumbsTree: BreadTree;
  categoryById: ICategory | null;
}

const initialState: InitialState = {
  categories: [],
  categoriesTree: [],
  breadCrumbsTree: {},
  categoryById: null,
};

export const categorySlice = createSlice( {
  name: 'category',
  initialState,
  reducers: {
    setAllCategory: ( state, { payload }: PayloadAction<ICategory[]> ) => {
      state.categories = payload;
      const cloneCategories: ICategory[] = cloneDeep( state.categories );
      const instead = { _id: 'key', name: 'label', children: 'nodes' };
      const tree: ICategoryTree[] = buildCategoryTree( payload );
      state.categoriesTree = replaceKeysDeep( tree, instead );
      const crumbs: ICategory[] = buildCategoryTree( cloneCategories, false );
      state.breadCrumbsTree = crumbs.reduce( ( mask: BreadTree, item: ICategory ) => ( {
        ...mask,
        [item._id]: item,
      } ), {} );
    },
    setCategoryById: ( state, { payload }: PayloadAction<ICategory> ) => {
      state.categoryById = payload;
    },
  },
} );

export const { setAllCategory, setCategoryById } = categorySlice.actions;

export default categorySlice.reducer;
