import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListRevenueDeskDecisions = ({ shipmentId }) => {
    const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_decisions',
	}, { manual: true });

    const fetchRevenueDeskDecisions = async()=>{
        try{
            const resp = await trigger({
                params:{
                    filters:{
                        shipment_id: shipmentId,
                    }
                }
            })
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchRevenueDeskDecisions();
    },[])
    return {
        data,
        loading
    }
}
export default useListRevenueDeskDecisions;