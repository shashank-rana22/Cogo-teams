import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetMinPrice = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : 'get_freight_rate_min_price',
	}, { manual: true });

	const getMinPrice = useCallback(async () => {
		try {
			await trigger({
				params: {
					currency           : 'USD',
					service_attributes : [
						{
							filters: {
								// id: '1c09df70-f14b-4921-86c7-741cdb58abd7',
							},
							id           : '1234567',
							service_type : 'haulage_freight',
						},
						{
							filters: {
								// id: '1c09df70-f14b-4921-86c7-741cdb58abd7',
							},
							id           : '09876',
							service_type : 'fcl_freight',
						},
						{
							filters: {
								// id: '1c09df70-f14b-4921-86c7-741cdb58abd7',
							},
							id           : '4567',
							service_type : 'fcl_customs',
						},
						{
							filters: {
								// id: '1c09df70-f14b-4921-86c7-741cdb58abd7',
							},
							id           : 'esdrftg',
							service_type : 'fcl_cfs',
						},
					],
				},
			});
		} catch (err) {
			// if (err?.response?.data) {
			// 	Toast.error(getApiErrorString(err.response?.data));
			// }
			console.log(err);
		}
	}, [trigger]);

	useEffect(() => {
		// console.log('hello');
		getMinPrice();
	}, [getMinPrice]);

	return {
		minPrice: data,
		loading,
	};
};
export default useGetMinPrice;
