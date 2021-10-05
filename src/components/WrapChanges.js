import React from 'react';

const WrapChanges = ( { children } ) => (
  <div className="container h-100 p-3">
    <main className="h-100">
      {children}
    </main>
  </div>
);

export default WrapChanges;
