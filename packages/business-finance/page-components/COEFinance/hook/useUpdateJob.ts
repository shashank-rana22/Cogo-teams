import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';

const useUpdateJob = ({shipmentData}) => {
    const [{ data, loading }, trigger] = useRequest(
		{
			url     : '/update_shipment',
			method  : 'post',
		}
	);
    
	const getData = async()=>{
		try{
			await trigger({
				data:{
                    id: shipmentData?.id,
					is_job_closed: !shipmentData?.is_job_closed,
				}
			})
		}catch(error){
			console.log('error->',error);
		}
	}

    return{getData , loading}
}


export default useUpdateJob