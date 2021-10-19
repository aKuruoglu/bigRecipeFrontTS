function useKeysChain ( currentId, crumbsMap ) {
  let category = crumbsMap[currentId];
  const res = [];

  while ( category ) {
    res.unshift( category._id );
    category = category.parent;
  }

  return res.join( '/' );
}

export default useKeysChain;
