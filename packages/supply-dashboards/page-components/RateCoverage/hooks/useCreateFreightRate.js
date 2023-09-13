import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

const API_NAME = {
	fcl_freight : '/create_fcl_freight_rate',
	air_freight : '/create_air_freight_rate',
};

const useCreateFreightRate = (service) => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const [{ loading }, trigger] = useRequest({
		url    : API_NAME[service],
		method : 'POST',
	}, { manual: true });

	const createRate = async (data) => {
		const weight_slabs = (data?.weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit || item?.price,
			currency     : item?.currency || data?.currency,
		}));
		const UPDATED_LINE_ITEMS = [];

		(data?.line_items || []).forEach((item) => {
			if (typeof item.remarks === 'string') {
				const lineItem = { ...item, remarks: [item.remarks], slabs: data?.container_slabs };
				UPDATED_LINE_ITEMS.push(lineItem);
			} else {
				const lineItem = { ...item, slabs: data?.container_slabs };
				UPDATED_LINE_ITEMS.push(lineItem);
			}
		});

		const params = (service === 'air_freight') ? {
			origin_airport_id      : data?.origin_airport_id,
			destination_airport_id : data?.destination_airport_id,
			commodity_type         : data?.commodity_type || 'all',
			commodity_sub_type     : data?.commodity_sub_type || 'all',
			weight_slabs,
		} : {
			origin_port_id      : data?.origin_location_id,
			destination_port_id : data?.destination_location_id,
			line_items          : [...UPDATED_LINE_ITEMS],
			weight_slabs,
		};

		try {
			const resp = await trigger({
				data: {
					...params,
					commodity                : data?.commodity,
					airline_id               : data?.airline_id,
					shipping_line_id         : data?.shipping_line_id,
					operation_type           : data?.flight_operation_type,
					container_size           : data?.container_size,
					container_type           : data?.container_type,
					currency                 : data?.currency,
					price_type               : data?.price_type,
					service_provider_id      : data?.service_provider_id,
					procured_by_id           : data?.procured_by_id || user_id,
					sourced_by_id            : data?.sourced_by_id,
					validity_start           : data?.validity_start,
					validity_end             : data?.validity_end,
					origin_main_port_id      : data?.origin_main_port_id,
					destination_main_port_id : data?.destination_main_port_id,
					schedule_type            : data?.schedule_type,
				},
			});
			if (resp?.data) { return resp?.data?.id; }
		} catch (err) {
			Toast.error(startCase(err?.response?.data?.detail));
		}
		return null;
	};

	return {
		loading,
		createRate,
	};
};

export default useCreateFreightRate;
