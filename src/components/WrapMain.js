import React from 'react';
import CategoryTree from './category/CategoryTree';

const WrapMain = ( { children } ) => (
  <div className="container h-100">
    <div className="row h-100">

      <nav className="col-md-3">
        <CategoryTree />
      </nav>

      <main className="col-md-9">
        { children }
      </main>

    </div>
  </div>
);

export default WrapMain;
