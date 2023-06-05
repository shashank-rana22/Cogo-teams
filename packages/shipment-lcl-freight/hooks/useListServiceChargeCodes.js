import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListServiceChargeCodes = ({ defaultFilters = {}, defaultParams = {}, initialCall = true }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_additional_service_codes',
		method : 'GET',
		params : {
			filters: { ...defaultFilters },
			...defaultParams,
		},
	});

	const getListChargeCodes = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) getListChargeCodes();
	}, [getListChargeCodes, initialCall]);

	return {
		loading,
		list    : data?.list || [],
		refetch : getListChargeCodes,
	};
};
export default useListServiceChargeCodes;
