import {Id, IGeneralItem} from "../common/interface";

export interface IRecipe extends IGeneralItem {
  description: string;
  categoryId: Id;
}

export interface IAllRecipe {
  entities: IRecipe[];
  total: number
}
