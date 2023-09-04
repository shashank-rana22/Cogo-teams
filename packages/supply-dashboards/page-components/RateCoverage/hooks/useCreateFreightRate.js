import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

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
		const weight_slabs = (data?.weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit,
			currency     : data?.currency,
		}));

		try {
			const resp = await trigger({
				data: {
					origin_airport_id      : data?.origin_airport_id,
					destination_airport_id : data?.destination_airport_id,
					commodity              : data?.commodity,
					airline_id             : data?.airline_id,
					operation_type         : data?.flight_operation_type,
					currency               : data?.currency,
					price_type             : data?.price_type,
					service_provider_id    : data?.service_provider_id,
					procured_by_id         : data?.procured_by_id,
					sourced_by_id          : data?.sourced_by_id,
					validity_start         : data?.validity_start,
					validity_end           : data?.validity_end,
					commodity_type         : 'all',
					weight_slabs,
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
