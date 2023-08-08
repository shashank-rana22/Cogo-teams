import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetShipmentProcess = (defaultParams = {}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_process',
		method : 'GET',
		params : {
			shipment_type: 'air_freight',
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
	};
};

export default useGetShipmentProcess;
