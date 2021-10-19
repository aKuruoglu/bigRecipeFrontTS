import React from 'react';

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

export default SimpleRecipe;
