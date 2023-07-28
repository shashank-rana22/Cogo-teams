import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetAirFreightSurcharges = (taskItem) => {
	const [{ data = {}, loading }, trigger] = useRequest('/get_air_freight_rate_surcharge', { manual: true });
	console.log(taskItem, 'taskItem');

	const getAirFreightSurcharges = useCallback(async () => {
		try {
			await trigger({
				params: {

					origin_airport_id      : '7391cac2-e8db-467f-a59b-574d01dd7e7c',
					destination_airport_id : '8861b17e-1fb3-469a-b157-e3ff82f75676',
					commodity              : 'general',
					airline_id             : 'cd0a5a97-add6-4387-9966-1011ec465951',
					operation_type         : 'passenger',
					service_provider_id    : '36cee6fb-eeaf-4643-9db5-397544339635',

				},

			});
		} catch (err) {
			console.error(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	return { data, getAirFreightSurcharges, loading };
};

export default useGetAirFreightSurcharges;
