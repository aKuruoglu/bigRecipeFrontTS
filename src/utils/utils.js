import { isObject, transform, keys } from 'lodash';

export const buildCategoryTree = ( array, tree = true ) => {
  const categoriesMap = array.reduce( ( mask, item ) => ( {
    ...mask,
    [item._id]: item,
  } ), {} );

  const result = [];

  for ( let i = 0; i < array.length; i++ ) {
    const item = categoriesMap[array[i]._id];

    if ( !item.parentCategoryId ) {
      result.push( item );
      continue;
    }

    if ( !categoriesMap[item.parentCategoryId] ) {
      continue;
    }
    const parent = categoriesMap[item.parentCategoryId];
    if ( tree ) {
      parent.children = parent.children || [];
      parent.children.push( item );
    } else {
      item.parent = parent;
    }
  }
  return tree ? result : array;
};

export function hasChildren ( item ) {
  if ( item.children === undefined ) {
    return false;
  }

  return item.children.length !== 0;
}

export const replaceKeysDeep = ( obj, keysMap ) => transform( obj, ( result, value, key ) => {
  const currentKey = keysMap[key] || key;
  // eslint-disable-next-line no-param-reassign
  result[currentKey] = isObject( value ) ? replaceKeysDeep( value, keysMap ) : value;
} );

export const omit = ( originalObj = {}, keysToOmit = [] ) => Object.fromEntries(
  Object.entries( originalObj )
    .filter( ( [key] ) => !keysToOmit.includes( key ) ),
);
