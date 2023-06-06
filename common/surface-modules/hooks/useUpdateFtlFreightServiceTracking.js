import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateFtlFreightServiceTracking = () => {
	const [data, setData] = useState([]);

	const [loading, trigger] = useLensRequest({
		url    : 'create_saas_surface_shipment_detail',
		method : 'POST',
	}, { manual: true });

	const updateService = async ({
		values = {},
		setStartTruckTracker = () => {},
		refresh = false,
		serialId,
		listShipments = () => {},
		servicesData = {},
		refetch = () => {},
	}) => {
		try {
			const res = await trigger({
				data: {
					truck_number            : servicesData?.truck_number,
					serial_id               : serialId ? serialId.toString() : undefined,
					origin_location_id      : servicesData?.origin_location_id,
					destination_location_id : servicesData.destination_location_id,
					mobile_number           : values.mobile_number,
					service_provider_id     : servicesData.service_provider_id,
					refresh,
					trip_id                 : servicesData.trip_id ? servicesData.trip_id : undefined,
				},
			});
			if (!res.hasError) {
				Toast.success('Service updated successfully');
			}
			setData(res?.data);
			setStartTruckTracker(false);
			if (res?.status === 200) {
				listShipments();
				if (!refresh) refetch();
			}
		} catch (err) {
			toastApiError(err?.data?.message || 'Unable to apply for service');
		}
	};

	return { data, loading, updateService };
};

export default useUpdateFtlFreightServiceTracking;
