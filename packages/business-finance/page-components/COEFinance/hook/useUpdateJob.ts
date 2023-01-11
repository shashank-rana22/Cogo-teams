import { useRequest, useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import { GenericObject } from '../../commons/Interfaces';
import { useSelector } from '@cogoport/store';
interface Params{
	shipmentData?:GenericObject
    query?: GenericObject
}
const useUpdateJob = ({query}:Params) => {

	const{shipment_id,jobNumber,jobSource,jobType}=query||{}

	const { user_data } = useSelector(({ profile }:any) => ({
		user_data: profile?.user || {},
	}));


    const [{ data, loading }, trigger] = useRequest(
		{
			url     : '/update_shipment',
			method  : 'post',
		}
	);

	const [{ data:FinalDataClose, loading:FinalLoading }, FinalTrigger] = useRequestBf(
		{
			url     : '/common/job/close-financially',
			method  : 'post',
		}
	);

    const getFinalData = async() =>{
		try{
			await FinalTrigger({
				data:{
					jobNumber:jobNumber,
					jobType: jobType,
					jobSource: jobSource,
					updatedBy: user_data?.id
				}
			})
			Toast.success('Close successfully...');
		}catch(error){
			Toast.error('Job Not Found...');
		}

	}
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
                    id: shipment_id,
					is_job_closed: jobClose(),
				}
			})
			Toast.success('Close successfully...');
		}catch(error){
			Toast.error('Job Not Found...');
		}
	}

    return{getData ,getFinalData,FinalLoading, loading}
}


export default useUpdateJob