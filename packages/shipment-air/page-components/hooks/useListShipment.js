import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const SHIPMENT_STATE_MAPPINGS = {
	ongoing   : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	completed : ['completed'],
	cancelled : ['cancelled'],
};
const useListShipment = ({ serviceActiveTab, shipmentStateTab, searchQuery }) => {
	const [filters, setFilters] = useState({});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		params : {
			page    : 1,
			q       : searchQuery,
			filters : {
				state         : SHIPMENT_STATE_MAPPINGS[shipmentStateTab],
				shipment_type : serviceActiveTab,
			},
		},
	}, { manual: true });

	const apiTrigger = async () => {
		const params = {
			page    : 1,
			q       : searchQuery,
			filters : {
				state         : SHIPMENT_STATE_MAPPINGS[shipmentStateTab],
				shipment_type : serviceActiveTab,
				...filters,
			},
		};
		try {
			 await trigger({ params });
		} catch (err) {

		}
	};

	useEffect(() => {
		apiTrigger();
	}, [serviceActiveTab, shipmentStateTab, searchQuery, filters]);

	return {
		loading,
		filters,
		apiTrigger,
		setFilters,
		data,

	};
};
export default useListShipment;
