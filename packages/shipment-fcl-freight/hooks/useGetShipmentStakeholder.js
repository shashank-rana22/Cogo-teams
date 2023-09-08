import { useRequest } from '@cogoport/request';

const useGetShipmentStakeholder = ({ shipment_id = '', stakeholder_type = '' }) => {
	const [{ data, loading }] = useRequest({
		url    : 'fcl_freight/list_stakeholders',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
				stakeholder_type,
			},
		},
	}, { manual: false });

	return {
		data: data?.list || [],
		loading,
	};
};

export default useGetShipmentStakeholder;
