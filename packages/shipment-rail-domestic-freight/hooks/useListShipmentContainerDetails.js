import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useListShipmentContainerDetails = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_container_details',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(
			async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data,
		apiTrigger,

	};
};

export default useListShipmentContainerDetails;
