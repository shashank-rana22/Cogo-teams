import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

export default function useListShipmentServices({ defaultParams = {}, defaultFilters = {}, initialCall = true }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_shipment_services',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const listServices = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) listServices();
	}, [listServices, initialCall]);

	return {
		servicesLoading : loading,
		refetchServices : listServices,
		servicesList    : data?.list,
	};
}
