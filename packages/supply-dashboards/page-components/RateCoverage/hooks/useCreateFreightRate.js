import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const API_NAME = {
	fcl_freight : '/create_fcl_freight_rate',
	air_freight : '/create_air_freight_rate',
};

const useCreateFreightRate = (service) => {
	const [{ loading }, trigger] = useRequest({
		url    : API_NAME[service],
		method : 'POST',
	}, { manual: true });

	const createRate = async (data) => {
		console.log(data, 'dataaa?');
		try {
			await trigger({
				data: {
					origin_airport_id      : data?.origin_airport,
					destination_airport_id : data?.destination_airport,
					commodity_type         : data?.commodity,
					airline_id             : data?.air_line,
					operation_type         : data?.flight_operation_type,
					currency               : data?.currency,
					price_type             : data?.price_type,
					service_provider_id    : data?.service_provider,
					procured_by_id         : data?.rate_procured_by_cogoport_agent,
					sourced_by_id          : data?.sourced_by_id,
					validity_start         : data?.startDateTime,
					validity_end           : data?.endDateTime,
					// validity_start         : data?.validity_start,
					// validity_end           : data?.validity_end,
					// service_provider_id    : data?.service_provider_id,
					// shipping_line_id       : data?.shipping_line_id,
					// sourced_by_id          : data?.sourced_by_id,
				},
			});
		} catch (err) {
			// console.log(err);
			Toast.error('failed to cancel');
		}
	};

	return {
		loading,
		createRate,
	};
};

export default useCreateFreightRate;
