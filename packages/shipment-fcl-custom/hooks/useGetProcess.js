import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetShipmentProcess({ defaultParams = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_customs/get_process',
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
