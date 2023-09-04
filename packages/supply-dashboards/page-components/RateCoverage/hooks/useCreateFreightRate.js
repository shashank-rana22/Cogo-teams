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
		const weight_slabs = [
			{
				lower_limit  : data?.lower_limit,
				upper_limit  : data?.upper_limit,
				tariff_price : data?.price_per_unit,
				currency     : 'INR',
			},
		];
		try {
			const resp = await trigger({
				data: {
					origin_airport_id      : data?.origin_airport,
					destination_airport_id : data?.destination_airport,
					commodity              : data?.commodity,
					airline_id             : data?.air_line,
					operation_type         : data?.flight_operation_type,
					currency               : data?.currency,
					price_type             : data?.price_type,
					service_provider_id    : data?.service_provider,
					procured_by_id         : data?.rate_procured_by_cogoport_agent,
					sourced_by_id          : data?.rate_provided_by_lsp_user,
					validity_start         : data?.startDateTime,
					validity_end           : data?.endDateTime,
					commodity_type         : 'all',
					weight_slabs,
					// validity_start         : data?.validity_start,
					// validity_end           : data?.validity_end,
					// service_provider_id    : data?.service_provider_id,
					// shipping_line_id       : data?.shipping_line_id,
					// sourced_by_id          : data?.sourced_by_id,
				},
			});
			if (resp?.data) { return resp?.data?.id; }
		} catch (err) {
			// console.log(err);
			Toast.error('failed to cancel');
		}

		return '';
	};

	return {
		loading,
		createRate,
	};
};

export default useCreateFreightRate;
