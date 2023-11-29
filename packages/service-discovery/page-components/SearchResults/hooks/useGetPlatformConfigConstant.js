import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const URL = '/get_platform_config_constant';

const useGetPlatformConfigConstant = ({ setMinCargoValues = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : URL,
		method : 'GET',
	}, { manual: true });

	const getPlatformConfigConstant = useCallback(async () => {
		try {
			const res = await trigger({
				params: { key_name: 'CONTRACT_BOOKINGS_LIMIT', service: 'Global' },
			});
			setMinCargoValues(res?.data?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.value || {});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [setMinCargoValues, trigger]);
	return {
		loading,
		getPlatformConfigConstant,
	};
};

export default useGetPlatformConfigConstant;
