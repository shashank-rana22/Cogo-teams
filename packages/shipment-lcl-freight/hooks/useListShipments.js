import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useListShipments = ({ defaultFilters = {}, defaultParams = {}, initialCall = true }) => {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res =	await trigger();

			setData(res?.data || {});
		} catch (err) {
			setData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) {
			apiTrigger();
		}
	}, [apiTrigger, initialCall, filters]);

	return {
		data,
		loading,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListShipments;
