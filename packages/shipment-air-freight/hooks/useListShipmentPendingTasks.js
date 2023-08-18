import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useListShipmentPendingTasks = ({ defaultParams = {}, defaultFilters = {}, filters = {} }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data || {});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	const filtersInJSON = JSON.stringify(filters);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filtersInJSON]);

	return {
		loading,
		apiTrigger,
		data,
	};
};

export default useListShipmentPendingTasks;
