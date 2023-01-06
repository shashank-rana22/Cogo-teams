import { useRequest} from '@cogoport/request';
import { useEffect } from 'react';

const useListShipment = (jobNumber:string | undefined) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url     : 'list_shipments',
			method  : 'get',
		}
	);

	const getData=async()=>{
		try{
			await trigger({
				params:{
					  filters:{
							serial_id: jobNumber
					  }
				}
			})
		}catch(error){
			console.log('error->',error);
		}
	}

	useEffect(()=>{
	      getData();
	},[jobNumber])

	return {
		data,
		loading
	};
};

export default useListShipment;
