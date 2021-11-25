import {TreeNodeInArray} from "react-simple-tree-menu/dist/TreeMenu/walk";

interface ICount {
  articleCount: number;
  recipeCount: number;
}

export interface ICategory extends ICount {
  _id: string;
  name: string;
  parentCategoryId: string;
  children?: ICategory[];
  parent?: ICategory
}

export interface ICategoryTree extends TreeNodeInArray{
  parentCategoryId?: string;
  nodes?: ICategoryTree[];
}

export interface BreadTree {
 [key: string]: ICategory
}
