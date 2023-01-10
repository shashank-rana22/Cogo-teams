import { useEffect } from 'react';
import { useRequest } from '@cogoport/request';

const useUpdateJob = ({shipmentData}) => {
    const [{ data, loading }, trigger] = useRequest(
		{
			url     : '/update_shipment',
			method  : 'post',
		}
	);
    console.log(shipmentData,"shipmentData");
    

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

    useEffect(()=>{getData()},[])
    return{data}
}


export default useUpdateJob