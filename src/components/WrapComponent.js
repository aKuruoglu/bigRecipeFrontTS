import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import { getCategories } from '../redux/category/action';

const WrapComponent = ( { children, getCategoriesCall } ) => {
  useEffect( () => {
    getCategoriesCall();
  }, [getCategoriesCall] );
  return (
    <>
      <NavBar />
      { children }
    </>
  );
};

export default connect( ( ) => ( { } ),
  {
    getCategoriesCall: getCategories,
  } )( WrapComponent );
