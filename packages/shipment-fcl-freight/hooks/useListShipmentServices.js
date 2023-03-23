import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListShipmentServices({ shipment_data }) {
	const [{ loading : servicesLoading, data }, trigger] = useRequest({
		url    : 'list_shipment_services',
		method : 'GET',
	}, { manual: true });

	const listServices = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							shipment_id : shipment_data?.id,
							status      : ['active', 'pending', 'inactive'],
						},
						service_stakeholder_required: true,
						additional_data_required:
							true,
						can_edit_booking_params : true,
						page_limit              : 100,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, shipment_data?.id]);

	useEffect(() => {
		listServices();
	}, [listServices, shipment_data?.id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : data?.list || [],
		},

	};
}

export default useListShipmentServices;
