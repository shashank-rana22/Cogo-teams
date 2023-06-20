import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const SHIPMENT_STATE_MAPPINGS = {
	ongoing   : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	completed : ['completed'],
	cancelled : ['cancelled'],
};
const DEFAULT_PAGE = 1;

const useListShipment = ({ serviceActiveTab, shipmentStateTab, searchQuery }) => {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		params : {
			page,
			filters: {
				state         : SHIPMENT_STATE_MAPPINGS[shipmentStateTab],
				shipment_type : serviceActiveTab,
				q             : searchQuery,
				...filters,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [shipmentStateTab, serviceActiveTab, searchQuery, filters, page, apiTrigger, authParams, selected_agent_id]);

	useEffect(() => {
		setPage(DEFAULT_PAGE);
	}, [searchQuery, serviceActiveTab]);

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
