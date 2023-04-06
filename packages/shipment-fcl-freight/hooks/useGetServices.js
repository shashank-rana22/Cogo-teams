import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetServices({ shipment_id, additional_methods = [] }) {
	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id,
						additional_methods,
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, shipment_id, additional_methods]);

	useEffect(() => {
		if (shipment_id) listServices();
	}, [listServices, shipment_id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : data?.summary || [],
		},

	};
}

export default useGetServices;
