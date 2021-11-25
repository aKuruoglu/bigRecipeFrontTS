import {Id, IGeneralItem} from "../common/interface";

export interface IArticle extends IGeneralItem {
  description: string;
  mainText: string;
  categoryId?: Id;
}

export interface IAllArticles {
  entities: IArticle[];
  total: number
}

