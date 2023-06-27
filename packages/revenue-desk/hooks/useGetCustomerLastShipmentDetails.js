import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCustomerLastShipmentDetails = ({ itemData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_customers_last_shipment_details',
	}, { manual: true });
	const getLastShipmentDetails = async () => {
		try {
			await trigger({
				params: {
					importer_exporter_id : itemData?.importer_exporter_id,
					shipment_type        : itemData?.shipment_type,
					filters              : {
						air_freight_services: {
							origin_airport_id      : itemData?.origin_airport_id,
							destination_airport_id : itemData?.destination_airport_id,
						},
					},
					page_limit : 1,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	};

	useEffect(() => {
		getLastShipmentDetails();
	}, []);
	return {
		data, loading,
	};
};
export default useGetCustomerLastShipmentDetails;
