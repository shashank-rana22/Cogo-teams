import { useRequest} from '@cogoport/request';
import { useEffect } from 'react';

const useShipmentDocument = (shipmentId) => {
	
	const [{ data, loading }, trigger] = useRequest(
		{
			url     : '/shipment/list_shipment_documents',
			method  : 'get',
			// authKey : 'get_list_shipments',
		},
		{ autoCancel: false },
	);

	useEffect(()=>{
		trigger({
			params:{
                  created_by_user_details_required: true,
                  filters:{
                    shipment_id: shipmentId
				  }
			}
		})
	},[])

	
	return {
		data,
		loading
	};
};

export default useShipmentDocument;
