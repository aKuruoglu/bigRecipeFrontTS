import React from 'react';

const Input = ( { input, meta } ) => (
  <div className="flex-column">
    <input { ...input } className="form-control" />
    <div style={ { color: 'red' } }>
      {meta.error && meta.touched && <small>{meta.error}</small>}
    </div>
  </div>
);

export default Input;
