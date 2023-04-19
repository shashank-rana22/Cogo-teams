import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListShipmentOrganizations = ({ shipment_data }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({ q: '' });
	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_organizations',
		method : 'GET',
		params : {
			filters,
			shipment_id: shipment_data?.id,
		},

	}, { manual: true });

	const getList = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getList();
	}, [getList]);

	return {
		// getList,
		loading,
		apiData,
		filters,
		setFilters,
	};
};
export default useListShipmentOrganizations;
