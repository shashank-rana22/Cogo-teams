import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useShipmentDocument = (shipmentId) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_shipment_documents',
			method : 'get',
		},
		{ autoCancel: false },
	);

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					created_by_user_details_required : true,
					filters                          : {
						shipment_id: shipmentId,
					},
					page       : 1,
					page_limit : 50,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [shipmentId, trigger]);

	useEffect(() => {
		refetch();
	}, [shipmentId, trigger, refetch]);

	return {
		data,
		loading,
		refetchShipmentDocument: refetch,
	};
};

export default useShipmentDocument;
