import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const useGetFclFreightRateLifecycle = ({ globalFilters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_lifecycle',
		method : 'GET',
	}, { manual: true });

	const getFclFreightRateLifecycle = useCallback((params) => {
		try {
			trigger({ params });
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		const { service_type } = globalFilters;
		if (service_type === 'fcl') {
			const params = getFormattedPayload(globalFilters, ['chart_type']);
			getFclFreightRateLifecycle(params);
		}
	}, [globalFilters, getFclFreightRateLifecycle]);

	return {
		graphs: data?.graph,
		loading,
		getFclFreightRateLifecycle,
	};
};

export default useGetFclFreightRateLifecycle;
