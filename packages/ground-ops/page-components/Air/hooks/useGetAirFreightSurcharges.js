import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAirFreightSurcharges = (taskItem) => {
	const [{ data = {} }, trigger] = useRequest('/get_air_freight_rate_surcharge', { manual: true });

	const getAirFreightSurcharges = useCallback(async () => {
		try {
			await trigger({
				params: {

					origin_airport_id      : taskItem?.originAirportId,
					destination_airport_id : taskItem?.destinationAirportId,
					commodity              : taskItem?.commodity,
					airline_id             : taskItem?.airlineId,
					operation_type         : taskItem?.operationType,
					service_provider_id    : taskItem?.serviceProviderId,

				},

			});
		} catch (err) {
			console.error(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	return { data, getAirFreightSurcharges };
};

export default useGetAirFreightSurcharges;
