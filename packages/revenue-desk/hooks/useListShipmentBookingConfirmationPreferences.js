import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentBookingConfirmationPreferences = ({
	singleServiceData,
	shipmentData,
	isPreferenceRequired,
} = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_booking_confirmation_preferences',
	}, { manual: true });

	const serviceType = singleServiceData?.service_type;
	const serviceId = singleServiceData?.id;
	const shipmentId = shipmentData?.id;

	const getList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: { service_id: serviceId, shipment_id: shipmentId, service_type: serviceType },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, serviceId, shipmentId, serviceType]);

	useEffect(() => {
		if (isPreferenceRequired) {
			getList();
		}
	}, [singleServiceData, getList, isPreferenceRequired]);

	return {
		data: data?.list,
		loading,
	};
};
export default useListShipmentBookingConfirmationPreferences;
