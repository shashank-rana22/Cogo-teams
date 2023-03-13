import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetWallet = (shipmentId) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_budget_transactions',
			method : 'get',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		trigger({
			params: {
				service_object_required         : true,
				budget_allocation_data_required : true,
				filters                         : { transaction_reason: 'negative margin', shipment_id: shipmentId },
			},
		});
	}, [shipmentId, trigger]);

	return {
		data,
		loading,
	};
};

export default useGetWallet;
