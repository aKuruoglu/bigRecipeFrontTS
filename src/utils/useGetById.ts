import { useEffect } from 'react';
import { Id } from "../redux/common/interface";

function useGetById ( id: Id, callback: any ) {
  useEffect( () => {
    callback( id );
  }, [callback, id] );
}

export default useGetById;
