import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetShipmentProcess({ defaultParams, shipment_type }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${shipment_type}/get_process`,
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
