import { useRequest } from '@cogoport/request';

const useGetShipmentStakeholder = ({ shipment_id = '', stakeholder_type = '' }) => {
	const [{ data, loading }] = useRequest({
		url    : 'list_shipment_stakeholders',
		method : 'GET',
		params : {
			filters: {
				shipment_id,
				stakeholder_type,
			},
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetShipmentStakeholder;
