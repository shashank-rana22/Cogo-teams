import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetShipmentProcess() {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_process',
		method : 'GET',
	}, { manual: true });

	const getProcessConfigs = useCallback(() => {
		(
			async () => {
				try {
					await trigger({
						params: {
							status: 'active',
						},
					});
				} catch (err) {
					Toast.error(getApiErrorString(err));
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
