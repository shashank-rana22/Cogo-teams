import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetMinPrice = ({ detail = {} }) => {
	const { destination_port_id, origin_port_id } = detail;

	console.log('detail', detail);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : 'get_freight_rate_min_price',
		// params : {},
	}, { manual: true });

	const getMinPrice = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_type : 'fcl_freight',
					filters      : {
						origin_port_id,
						destination_port_id,
					},
				},
			});
		} catch (err) {
			if (err?.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	}, [trigger]);

	useEffect(() => {
		getMinPrice();
	}, [getMinPrice]);

	return {
		minPrice: data,
		loading,
	};
};
export default useGetMinPrice;
