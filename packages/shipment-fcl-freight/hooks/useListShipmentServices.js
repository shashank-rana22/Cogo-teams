import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListShipmentServices({ shipment_data }) {
	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_service',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {

						shipment_id        : shipment_data?.id,
						additional_methods : ['service_objects', 'stakeholder', 'booking_requirements'],
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, shipment_data?.id]);

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
