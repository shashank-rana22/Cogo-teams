import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetShipmentEligibleBookingDocument = ({ shipmentData, singleServiceData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_elligible_booking_document',
	}, { manual: true });
	const shipmentId = shipmentData?.id;
	const shipmentState = shipmentData?.state;
	const getShipmentEligibleBookingList = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id : shipmentId,
					page_limit  : 100,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, shipmentId]);
	useEffect(() => {
		if (singleServiceData?.service_type === 'fcl_freight_service'
		&& ['in_progress', 'confirmed_by_importer_exporter'].includes(shipmentState)) {
			getShipmentEligibleBookingList();
		}
	}, [singleServiceData, getShipmentEligibleBookingList, shipmentState]);

	return {
		data,
		loading,
	};
};

export default useGetShipmentEligibleBookingDocument;
