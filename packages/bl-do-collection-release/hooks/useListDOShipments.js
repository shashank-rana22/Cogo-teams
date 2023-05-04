import { useRequest } from "@cogoport/request";
import { useCallback, useEffect } from 'react';

export default function useListDOShipments({ prefix }){
  const [{loading, data}, trigger] = useRequest({
    url: `${prefix}/list_collection_desk_bl_shipments`,
    method: 'GET'
  },{manual: true})

  const listDOs = useCallback(()=>{
    (async()=>{
      trigger({
        params: {
          page:1,
          page_limit: 10,
        }
      })
    })();
  },[trigger])

  useEffect(()=>{
    listDOs();
  },[listDOs]);

  console.log('data', data);
  return{
    data,
  }
}