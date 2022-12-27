import { useRequest} from '@cogoport/request';
import { useEffect } from 'react';

const useListShipment = (jobNumber) => {
	
	const [{ data, loading }, trigger] = useRequest(
		{
			url     : 'list_shipments',
			method  : 'get',
			// authKey : 'get_list_shipments',
		},
		{ autoCancel: false },
	);

	useEffect(()=>{
		trigger({
			params:{
                  filters:{
        				serial_id: jobNumber
				  }
			}
		})
	},[])

	
	return {
		data,
		loading
	};
};

export default useListShipment;
