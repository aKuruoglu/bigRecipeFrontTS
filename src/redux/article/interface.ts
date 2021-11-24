export interface IArticle {
  _id: string;
  title: string;
  description: string;
  mainText: string;
  categoryId?: string;
}

export interface IAllArticles {
  entities: IArticle[];
  total: number
}

