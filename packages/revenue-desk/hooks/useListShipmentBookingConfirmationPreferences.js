import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentBookingConfirmationPreferences = ({ singleServiceData, shipmentData } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_booking_confirmation_preferences',
	}, { manual: true });

	const serviceId = singleServiceData?.id;
	const shipmentId = shipmentData?.id;

	const getList = useCallback(async () => {
		try {
			await trigger({
				params: {
					rd_showed_rates : true,
					filters         : { service_id: serviceId, shipment_id: shipmentId },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, serviceId, shipmentId]);
	useEffect(() => {
		getList();
	}, [singleServiceData, getList]);
	return {
		data: data?.list,
		loading,
	};
};
export default useListShipmentBookingConfirmationPreferences;
