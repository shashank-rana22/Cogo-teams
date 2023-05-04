import { useRequest } from "@cogoport/request";
import { useCallback, useEffect } from 'react';

export default function useListBLShipments({ prefix = ''}) {
  const [{loading, data}, trigger] = useRequest({
    url: `${prefix}/list_collection_desk_do_shipments`
  },{manual: true});

  const listBLs = useCallback(()=>{
    (async() => {
      trigger({
        params: {
          filters: {},
          page: 1,
          page_limit: 10,
        }
      })
    })();
  },[trigger]);

  useEffect(()=>{
    listBLs();
  }, [listBLs]);

  return{
    data
  }
}