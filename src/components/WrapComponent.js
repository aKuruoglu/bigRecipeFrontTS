import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

WrapComponent.propTypes = {
  getCategoriesCall: PropTypes.func.isRequired,
  ifLoading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect( ( state ) => ( {
  ifLoading: state.common.ifLoading,
} ),
{
  getCategoriesCall: getCategories,
} )( WrapComponent );
