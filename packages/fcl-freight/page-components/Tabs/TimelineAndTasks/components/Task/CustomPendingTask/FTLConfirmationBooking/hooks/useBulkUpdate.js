import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';

const notIncludeFields = ['line_items', 'truck_type', 'service_id', 'isSelect'];

const useBulkUpdate = () => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateBulkShipment = useRequest(
		'post',
		false,
		scope,
	)('/bulk_update_shipment_services');

	const handleBulkPayload = (values) => {
		const payload = {
			service: 'ftl_freight',
			service_data: [],
		};

		payload.service_data = values.map((item) => {
			const data = {};

			Object.keys(item).forEach((key) => {
				if (key === 'driver_name' || key === 'contact_number') {
					const payloadKey = key === 'driver_name' ? 'name' : 'contact';
					if ('driver_details' in data) {
						data.driver_details[payloadKey] = item[key];
					} else {
						data.driver_details = {};
						data.driver_details[payloadKey] = item[key];
					}
				} else if (!notIncludeFields.includes(key)) {
					data[key] = item[key];
				}
			});

			return {
				service_id: item.service_id,
				data,
			};
		});

		return payload;
	};

	return {
		updateBulkShipment,
		handleBulkPayload,
	};
};
export default useBulkUpdate;
