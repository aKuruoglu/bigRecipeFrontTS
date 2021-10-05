import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../redux/category/action';

const WrapComponent = ( { children, getCategoriesCall } ) => {
  useEffect( () => {
    getCategoriesCall();
  }, [getCategoriesCall] );
  return (
    <>
      { children }
    </>
  );
};

export default connect( ( ) => ( { } ),
  {
    getCategoriesCall: getCategories,
  } )( WrapComponent );
