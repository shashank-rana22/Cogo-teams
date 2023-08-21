import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const MAX_PAGE_LIMIT = 50;

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
			page_limit: MAX_PAGE_LIMIT,
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
