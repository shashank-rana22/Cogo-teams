import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useGetShipmentProcess({ defaultParams = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_process',
		method : 'GET',
		params : {
			...defaultParams,
		},
	}, { manual: true });

	const getProcessConfigs = useCallback(() => {
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
		getProcessConfigs();
	}, [getProcessConfigs]);

	return {
		loading,
		data: data?.data?.services_config,
	};
}

export default useGetShipmentProcess;
