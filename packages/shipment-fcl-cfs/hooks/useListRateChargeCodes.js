import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useListRateChargeCodes = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'list_rate_charge_codes',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters, ...filters,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	return {
		loading,
		data: apiData,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListRateChargeCodes;
