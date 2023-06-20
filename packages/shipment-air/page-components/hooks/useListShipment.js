import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const SHIPMENT_STATE_MAPPINGS = {
	ongoing   : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	completed : ['completed'],
	cancelled : ['cancelled'],
};
const useListShipment = ({ serviceActiveTab, shipmentStateTab, searchQuery }) => {
	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		params : {
			page,
			filters : {
				state         : SHIPMENT_STATE_MAPPINGS[shipmentStateTab],
				shipment_type : serviceActiveTab,		
			},
		},
	}, { manual: true });

	const apiTrigger = async () => {
		const params = {
			page,
			
			filters : {
				q       : searchQuery,
				state         : SHIPMENT_STATE_MAPPINGS[shipmentStateTab],
				shipment_type : serviceActiveTab,
				...filters,
			},
		};
		try {
			 await trigger({ params });
		} catch (err) {
			console.log(err)
		}
	};

	useEffect(() => {
		apiTrigger();
	}, [ shipmentStateTab,serviceActiveTab, searchQuery, filters, page]);

	useEffect(()=>{
		setPage(1);
	},[searchQuery,serviceActiveTab])

	return {
		loading,
		filters,
		apiTrigger,
		setFilters,
		data,
		setPage,

	};
};
export default useListShipment;
