import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListShipmentServices = ({ shipmentId } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_services',
	}, { manual: true });

	const fetchShipmentsServices = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id : shipmentId,
						status      : ['active', 'pending', 'inactive'],
					},
					tasks_messages_count_required : false,
					pagination_data_required      : false,
					service_stakeholder_required  : true,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		fetchShipmentsServices();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		data,
		loading,
	};
};
export default useListShipmentServices;
