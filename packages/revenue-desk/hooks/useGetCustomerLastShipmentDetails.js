import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCustomerLastShipmentDetails = ({ itemData, isPillSelected }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_customers_last_shipment_details',
	}, { manual: true });
	const shipmentType = itemData?.shipment_type;
	let payload = {}
	if(isPillSelected){
		payload = (shipmentType==='fcl_freight')?{
			fcl_freight_services: {
				origin_airport_id      : itemData?.origin_port_id ,
				destination_airport_id : itemData?.destination_port_id,
			},
		}:{
			air_freight_services: {
				origin_airport_id      : itemData?.origin_airport_id ,
				destination_airport_id : itemData?.destination_airport_id,
			},
		}
	}
	const getLastShipmentDetails = async () => {
		try {
			await trigger({
				params: {
					importer_exporter_id : itemData?.importer_exporter_id,
					shipment_type        : shipmentType,
					filters              : {...payload},
					page_limit : 1,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	};

	useEffect(() => {
		getLastShipmentDetails();
	}, [isPillSelected]);
	return {
		data, loading,
	};
};
export default useGetCustomerLastShipmentDetails;
