import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListShipmentServices = ({ shipmentId } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_services',
	}, { manual: false });

	const fetchShipmentsServices = async () => {
		try {
			await trigger({
				params: {
					filters                       : { shipment_id: shipmentId },
					tasks_messages_count_required : false,
					pagination_data_required      : false,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		fetchShipmentsServices();
	}, []);
	return {
		data,
		loading,
	};
};
export default useListShipmentServices;
