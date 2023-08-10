import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useListConstantConfigurations = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_platform_config_constants',
		method : 'GET',
	});

	const fetchCostOfFuel = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						key_name: 'COST_OF_FUEL',
					},
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchCostOfFuel();
	}, [fetchCostOfFuel]);

	return {
		data,
		loading,
	};
};

export default useListConstantConfigurations;
