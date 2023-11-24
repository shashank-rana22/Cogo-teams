import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListShipmentPlans = ({ selectedCard }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_rfq_shipment_plans',
	}, { manual: true });

	const listShipmentPlans = useCallback(async () => {
		await trigger({ params: { filters: { rfq_search_id: selectedCard?.id, status: 'active' } } });
	}, [selectedCard?.id, trigger]);

	return {
		loading,
		data,
		listShipmentPlans,
	};
};

export default useListShipmentPlans;
