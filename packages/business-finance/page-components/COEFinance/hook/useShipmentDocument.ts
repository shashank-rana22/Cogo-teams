import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useShipmentDocument = (shipmentId) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/shipment/list_shipment_documents',
			method : 'get',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		trigger({
			params: {
				created_by_user_details_required : true,
				filters                          : {
					shipment_id: shipmentId,
				},
			},
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipmentId]);

	return {
		data,
		loading,
	};
};

export default useShipmentDocument;
