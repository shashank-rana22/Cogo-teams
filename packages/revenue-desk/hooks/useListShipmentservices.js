import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentServices = ({ shipmentId } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_services',
	}, { manual: true });

	const fetchShipmentsServices = useCallback(async () => {
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
	}, [trigger, shipmentId]);
	useEffect(() => {
		fetchShipmentsServices();
	}, [fetchShipmentsServices]);
	return {
		data,
		loading,
	};
};
export default useListShipmentServices;
