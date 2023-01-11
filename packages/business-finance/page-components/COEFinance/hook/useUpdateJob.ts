import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';
const useUpdateJob = ({shipmentData}) => {
    const [{ data, loading }, trigger] = useRequest(
		{
			url     : '/update_shipment',
			method  : 'post',
		}
	);

    
	const getData = async(data:string)=>{

		const jobClose = () =>{
			if(data=== 'Undo'){
				return false
			}
				return true	
		}
		
		try{
			await trigger({
				data:{
                    id: shipmentData?.list?.[0]?.id,
					is_job_closed: jobClose(),
				}
			})
			Toast.success('Close successfully...');
		}catch(error){
			Toast.error('Job Not Found...');
		}
	}

    return{getData , loading}
}


export default useUpdateJob