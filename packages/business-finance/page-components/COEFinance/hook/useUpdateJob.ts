import { useState } from 'react';
import { useRequest, useRequestBf } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import { GenericObject } from '../../commons/Interfaces';
import { useSelector } from '@cogoport/store';
interface Params{
	shipmentData?:GenericObject
    query?: GenericObject
	showButton?:boolean
	showFinal?:boolean
	setShowButton:Function
	setShowFinal:Function
}
const useUpdateJob = ({query,setShowButton,showButton,setShowFinal,showFinal}:Params) => {
	const{shipmentId,jobNumber,jobSource,jobType}=query||{}

	const { user_data } = useSelector(({ profile }:any) => ({
		user_data: profile?.user || {},
	}));


    const [{ data:CloseOperationally, loading }, trigger] = useRequest(
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
			setShowFinal(!showFinal)
			await FinalTrigger({
				data:{
					jobNumber:jobNumber,
					jobType: jobType,
					jobSource: jobSource,
					updatedBy: user_data?.user?.id
				}
			})
			Toast.success('Close successfully...');
			
		}catch(error){
			Toast.error(error);
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
                    id: shipmentId,
					is_job_closed: jobClose(),
				}
			})
			Toast.success('Close successfully...');
			setShowButton(!showButton)
			
		}catch(error){
			Toast.error('Job Not Found...');
		}
	}

    return{getData ,getFinalData,FinalLoading, loading}
}


export default useUpdateJob