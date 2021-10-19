import { useEffect } from 'react';

function useGetById ( id, callback ) {
  useEffect( () => {
    callback( id );
  }, [callback, id] );
}

export default useGetById;
