import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useGetShipmentFortigoTripDetail({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_fortigo_trip_detail',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getTasks = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getTasks();
	}, [getTasks]);

	return {
		loading,
		refetch: getTasks,
		data,
	};
}

export default useGetShipmentFortigoTripDetail;
