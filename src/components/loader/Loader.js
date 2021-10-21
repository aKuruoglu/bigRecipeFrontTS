import React from 'react';
import PropTypes from 'prop-types';
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

Loader.propTypes = {
  ifLoading: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf( PropTypes.element ).isRequired,
};

export default Loader;
