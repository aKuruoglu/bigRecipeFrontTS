import React, { FC } from 'react';
import { IArticle } from '../../redux/article/interface';

interface SimpleArticleProps {
  article: IArticle
}

const SimpleArticle: FC<SimpleArticleProps> = ( { article } ) => {
  const {
    _id, title, description, mainText, categoryId,
  } = article;

  return (
    <div className='card p-2'>
      <span>
        id:
        { _id }
      </span>
      <span>
        title:
        { title }
      </span>
      <span>
        description:
        { description }
      </span>
      <span>
        Text:
        { mainText }
      </span>
      <span>
        categoryId:
        { categoryId }
      </span>
    </div>
  );
};

export default SimpleArticle;
