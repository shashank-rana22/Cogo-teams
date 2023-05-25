import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

export default function useListShipmentCancellationReasons({
	defaultFilters = {},
	defaultParams = {},
	initialCall = true,
}) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_shipment_cancellation_reasons',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getReasons = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) getReasons();
	}, [initialCall, getReasons]);

	return {
		getReasons,
		reasons        : data?.options || [],
		reasonsLoading : loading,
	};
}
