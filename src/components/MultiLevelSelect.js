import React from 'react';

const MultiLevelSelect = ( { categories, categoryById, isDisabled } ) => {
  const renderOptions = ( items, level = 0 ) => {
    // eslint-disable-next-line no-param-reassign
    level += 1;
    const delimiter = '-';
    return items.map( ( item ) => [
      <option value={ item._id } selected={ item._id === categoryById._id } key={ item._id }>
        { delimiter.repeat( level ) }
        { item.name }
      </option>,
      item.children ? renderOptions( item.children, level ) : null,
    ] );
  };
  return (
    <div className="form-group">
      <label htmlFor="categorySelect" className="form-label mb-1">Category:</label>
      <select id="categorySelect" className="form-control" disabled={ isDisabled }>
        <option value="null">Without parent</option>
        { renderOptions( categories ) }
      </select>
    </div>

  );
};

export default MultiLevelSelect;
