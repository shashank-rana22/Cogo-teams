import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetShipmentOperatingProcedure = ({
	shipment_id,
	organization_id,
	defaultParams = {},
	defaultFilters = {},
}) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'get_shipment_operating_procedure',
		params : {
			filters: {
				organization_id,
				mode: 'ocean',
				shipment_id,
				...defaultFilters,
				...filters,
			},
			org_data_required: false,
			...defaultParams,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(
		() => { apiTrigger(); },
		[apiTrigger, filters],
	);

	return {
		loading,
		data: apiData,
		filters,
		setFilters,
		apiTrigger,
	};
};
export default useGetShipmentOperatingProcedure;
