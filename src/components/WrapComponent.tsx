import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import NavBar from './NavBar';
import { getCategories } from '../redux/category/action';
import Loader from './loader/Loader';
import {IAction} from "../redux/common/interface";
import {ICategory} from "../redux/category/interface";
import {RootState} from "../redux/rootReducer";

interface WrapComponentProps {
  getCategoriesCall: () => IAction<ICategory>;
  ifLoading: boolean;
  children: ReactElement | ReactNode
}

const WrapComponent: FC<WrapComponentProps> = ( { children, getCategoriesCall, ifLoading } ) => {
  useEffect( () => {
    getCategoriesCall();
  }, [getCategoriesCall] );
  return (
    <Loader ifLoading={ ifLoading }>
      <NavBar />
      <ReactNotification />
      <>
        { children }
      </>
    </Loader>
  );
};

export default connect( ( state: RootState ) => ( {
  ifLoading: state.common.ifLoading,
} ),
{
  getCategoriesCall: getCategories,
} )( WrapComponent );
