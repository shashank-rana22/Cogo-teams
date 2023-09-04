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
		const weight_slabs = [
			{
				lower_limit  : data?.lower_limit,
				upper_limit  : data?.upper_limit,
				tariff_price : data?.price_per_unit,
				currency     : 'INR',
			},
		];
		try {
			await trigger({
				data: {
					rate_id,
					id,
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
					closing_remarks        : checkboxValue !== '' ? checkboxValue : undefined,
				},
			});
		} catch (err) {
			// console.log(err);
			Toast.error('failed to cancel');
		}
	}, [trigger, checkboxValue]);

	return {
		loading,
		deleteRateJob,
		checkboxValue,
		setCheckboxValue,
	};
};

export default useDeleteRateJob;
