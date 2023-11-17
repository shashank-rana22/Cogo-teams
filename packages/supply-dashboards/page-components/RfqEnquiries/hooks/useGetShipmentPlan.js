import { useRequest } from '@cogoport/request';

const useListShipmentPlans = ({ selectedCard }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_rfq_shipment_plans',
	}, { manual: true });

	const listShipmentPlans = async () => {
		await trigger({ params: { filters: { rfq_search_id: selectedCard?.id, status: 'active' } } });
	};

	return {
		loading,
		data,
		listShipmentPlans,
	};
};

export default useListShipmentPlans;
