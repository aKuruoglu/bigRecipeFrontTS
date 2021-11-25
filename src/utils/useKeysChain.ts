import {Id} from "../redux/common/interface";
import {BreadTree} from "../redux/category/interface";

function useKeysChain ( currentId: Id, crumbsMap: BreadTree ) {
  let category = crumbsMap[currentId] || null;
  const res = [];

  while ( category ) {
    res.unshift( category._id );
    category = category.parent!;
  }

  return res.join( '/' );
}

export default useKeysChain;
