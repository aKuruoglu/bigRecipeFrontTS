import React from 'react';
import PropTypes from 'prop-types';

const SimpleArticle = ( { article } ) => {
  const {
    _id, title, description, mainText, categoryId,
  } = article;

  return (
    <div className="card p-2">
      <span>
        id:
        {_id}
      </span>
      <span>
        title:
        {title}
      </span>
      <span>
        description:
        {description}
      </span>
      <span>
        Text:
        {mainText}
      </span>
      <span>
        categoryId:
        {categoryId}
      </span>
    </div>
  );
};

SimpleArticle.propTypes = {
  article: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    mainText: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
  } ).isRequired,
};

export default SimpleArticle;
