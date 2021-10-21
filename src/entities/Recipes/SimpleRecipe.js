import React from 'react';
import PropTypes from 'prop-types';

const SimpleRecipe = ( { recipe } ) => {
  const {
    _id, title, description, categoryId,
  } = recipe;

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
        categoryId:
        {categoryId}
      </span>
    </div>
  );
};

SimpleRecipe.propTypes = {
  recipe: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
  } ),
};

SimpleRecipe.defaultProps = {
  recipe: {},
};

export default SimpleRecipe;
