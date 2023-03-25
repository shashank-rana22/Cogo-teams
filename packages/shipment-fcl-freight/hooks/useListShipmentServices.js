import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListShipmentServices({ shipment_data, additional_methods = [] }) {
	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id: shipment_data?.id,
						additional_methods,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, shipment_data?.id, additional_methods]);

	useEffect(() => {
		if (shipment_data?.id) { listServices(); }
	}, [listServices, shipment_data?.id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : data?.summary || [],
		},

	};
}

export default useListShipmentServices;
