export interface Category {
  _id: string;
  name: string;
  parentCategoryId: string;
  children?: Category[];
  parent?: Category
}

export interface ICategoryTree {
  key: string;
  label: string;
  parentCategoryId: string;
  nodes?: ICategoryTree[];
}

export interface BreadTree {
 [key: string]: Category
}
