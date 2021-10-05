import React from 'react';
import { Accordion } from 'react-bootstrap';
import MenuItem from './MenuItem';

const MenuItemMulti = ( { item, action } ) => (
  <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{ item.name }</Accordion.Header>
        <Accordion.Body style={ { padding: '0' } }>
          {/* eslint-disable-next-line max-len */}
          { item.children.map( ( subMenu ) => <MenuItem item={ subMenu } key={ subMenu._id } action={ action } /> ) }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
);

export default MenuItemMulti;
