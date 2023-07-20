import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCustomerLastShipmentDetails = ({ itemData, isPillSelected }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_customers_last_shipment_details',
	}, { manual: true });

	const shipmentType = itemData?.shipment_type;
	const importerExportId = itemData?.importer_exporter_id;
	const originPortId = itemData?.origin_port_id || itemData?.origin_airport_id;
	const destinationPortId = itemData?.destination_port_id || itemData?.destination_airport_id;

	const getLastShipmentDetails = useCallback(async () => {
		let PAYLOAD = {};
		if (isPillSelected) {
			PAYLOAD = (shipmentType === 'fcl_freight') ? {
				fcl_freight_services: {
					origin_port_id      : originPortId,
					destination_port_id : destinationPortId,
				},
			} : {
				air_freight_services: {
					origin_airport_id      : originPortId,
					destination_airport_id : destinationPortId,
				},
			};
		}

		try {
			await trigger({
				params: {
					importer_exporter_id : importerExportId,
					shipment_type        : shipmentType,
					filters              : { ...PAYLOAD },
					page_limit           : 1,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	}, [trigger, importerExportId, shipmentType, originPortId, destinationPortId, isPillSelected]);

	useEffect(() => {
		getLastShipmentDetails();
	}, [isPillSelected, getLastShipmentDetails]);
	return {
		data, loading,
	};
};
export default useGetCustomerLastShipmentDetails;
