import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import getRequiredFilters from '../utils/getRequiredFilters';

const useGetMinPrice = ({ allServices = [], total_price_currency = 'USD', detail = {} }) => {
	const newServices = [...allServices].splice(1);

	newServices.pop();

	const service_attributes = newServices.map((serviceItem) => {
		const { name = '', service_type, trade_type } = serviceItem;

		const filters = getRequiredFilters({ detail, service: name, trade_type });

		return {
			filters,
			id: name,
			service_type,
		};
	});

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : 'get_freight_rate_min_price',
	}, { manual: true });

	const getMinPrice = useCallback(async () => {
		try {
			await trigger({
				params: {
					currency: total_price_currency,
					service_attributes,
				},
			});
		} catch (err) {
			// if (err?.response?.data) {
			// 	Toast.error(getApiErrorString(err.response?.data));
			// }
		}
	}, [trigger]);

	useEffect(() => {
		if (!allServices || isEmpty(allServices)) return;

		getMinPrice();
	}, [getMinPrice]);

	return {
		startingPrices: data,
		loading,
	};
};
export default useGetMinPrice;
