import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css';

const Loader = ( { ifLoading, children } ) => (
  <>
    {ifLoading && (
    <div className={ styles.wrap }>
      <Spinner animation="border" variant="primary" />
    </div>
    )}
    <div>
      {children}
    </div>
  </>

);

export default Loader;
