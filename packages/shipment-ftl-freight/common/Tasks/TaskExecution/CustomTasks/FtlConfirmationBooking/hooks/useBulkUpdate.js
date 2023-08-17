import { useRequest } from '@cogoport/request';

const NOT_INCLUDE_FIELDS = ['line_items', 'truck_type', 'service_id', 'isSelect'];
const DRIVER_OBJ = {
	driver_name    : 'name',
	contact_number : 'contact',
};

const useBulkUpdate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	const bulkUpdate = (finalValues) => {
		const payload = {
			service      : 'ftl_freight',
			service_data : [],
		};

		payload.service_data = finalValues.map((item) => {
			const data = Object.entries(item).reduce((acc, [key, value]) => {
				if (Object.keys(DRIVER_OBJ).includes(key)) {
					const payloadKey = DRIVER_OBJ[key];
					if ('driver_details' in acc) {
						acc.driver_details[payloadKey] = value;
					} else {
						acc.driver_details = {};
						acc.driver_details[payloadKey] = value;
					}
				} else if (!NOT_INCLUDE_FIELDS.includes(key)) {
					acc[key] = value;
				}

				return acc;
			}, {});
			return {
				service_id: item.service_id,
				data,
			};
		});

		return payload;
	};

	return {
		loading,
		bulkUpdate,
		trigger,
	};
};

export default useBulkUpdate;
