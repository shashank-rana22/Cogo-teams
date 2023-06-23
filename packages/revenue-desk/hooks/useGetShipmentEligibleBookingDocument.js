import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentEligibleBookingDocument = ({ shipmentData, singleServiceData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_elligible_booking_document',
	}, { manual: true });
	const getShipmentEligibleBookingList = async () => {
		try {
			await trigger({
				params: {
					shipment_id : shipmentData?.id,
					page_limit  : 100,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		if (singleServiceData?.service_type === 'fcl_freight_service' 
		&& ['in_progress', 'confirmed_by_importer_exporter'].includes(shipmentData?.state)) {
			getShipmentEligibleBookingList();
		}
	}, [JSON.stringify(singleServiceData)]);

	return {
		data,
		loading,
	};
};

export default useGetShipmentEligibleBookingDocument;
