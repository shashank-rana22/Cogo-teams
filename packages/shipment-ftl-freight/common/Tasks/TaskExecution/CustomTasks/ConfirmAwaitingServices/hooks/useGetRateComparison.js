import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useGetRateComparison = (params = {}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_ftl_freight_rate_min_max_validity_dates',
		method : 'GET',
		params,
	}, { manual: true });

	const getRateComparison = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getRateComparison();
	}, [getRateComparison]);

	return {
		loading,
		data,
	};
};

export default useGetRateComparison;
