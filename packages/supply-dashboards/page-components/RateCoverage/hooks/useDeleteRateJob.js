import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const API_NAME = {
	fcl_freight : 'delete_fcl_freight_rate_job',
	air_freight : 'delete_air_freight_rate_job',
};

const useDeleteRateJob = (service) => {
	const endPoint = API_NAME[service];

	const [checkboxValue, setCheckboxValue] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : endPoint,
		method : 'POST',
	}, { manual: true });

	const deleteRateJob = useCallback(async ({ rate_id, data = {}, id }) => {
		const weight_slabs = (data?.weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit,
			currency     : data?.currency,
		}));

		try {
			const resp = await trigger({
				data: {
					rate_id,
					id,
					data: {
						origin_airport_id      : data?.origin_airport_id,
						destination_airport_id : data?.destination_airport_id,
						commodity              : rate_id ? data?.commodity : undefined,
						airline_id             : data?.airline_id,
						operation_type         : data?.flight_operation_type,
						currency               : data?.currency,
						price_type             : data?.price_type,
						service_provider_id    : data?.service_provider_id,
						procured_by_id         : data?.procured_by_id,
						sourced_by_id          : data?.sourced_by_id,
						validity_start         : data?.validity_start,
						validity_end           : data?.validity_end,
						commodity_type         : rate_id ? 'all' : undefined,
						weight_slabs           : rate_id ? weight_slabs : undefined,
						closing_remarks        : checkboxValue !== '' ? checkboxValue : undefined,
					},
				},
			});
			if (resp?.data) { return resp?.data?.id; }
		} catch (err) {
			Toast.error('failed to cancel');
		}
		return null;
	}, [trigger, checkboxValue]);

	return {
		loading,
		deleteRateJob,
		checkboxValue,
		setCheckboxValue,
	};
};

export default useDeleteRateJob;
