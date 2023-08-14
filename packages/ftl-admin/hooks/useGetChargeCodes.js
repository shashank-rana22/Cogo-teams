import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetChargeCodes = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_rate_charge_codes',
		method : 'GET',
	}, { manual: true });

	const getChargeCodes = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_names: ['ftl_freight_charges', 'platform_charges'],
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [trigger]);

	useEffect(() => {
		getChargeCodes();
	}, [getChargeCodes]);

	return {
		loading,
		list: data?.list || [],
		getChargeCodes,
	};
};

export default useGetChargeCodes;
