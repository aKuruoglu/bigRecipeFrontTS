import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import NavBar from './NavBar';
import { getCategories } from '../redux/category/action';
import Loader from './loader/Loader';

const WrapComponent = ( { children, getCategoriesCall, ifLoading } ) => {
  useEffect( () => {
    getCategoriesCall();
  }, [getCategoriesCall] );
  return (
    <Loader ifLoading={ ifLoading }>
      <NavBar />
      <ReactNotification />
      { children }
    </Loader>
  );
};

export default connect( ( state ) => ( {
  ifLoading: state.common.ifLoading,
} ),
{
  getCategoriesCall: getCategories,
} )( WrapComponent );
