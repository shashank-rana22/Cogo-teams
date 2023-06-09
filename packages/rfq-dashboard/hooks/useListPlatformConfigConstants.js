import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useListPlatformConfigConstants = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_platform_config_constants',
		method : 'GET',
	}, { manual: true });

	const listPlatformConfigConstants = async () => {
		try {
			await trigger({
				params: {
					filters: {
						key_name: 'THRESHOLD_MARGIN_PERCENTAGE',
					},
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		listPlatformConfigConstants,
		loading,
		data,
	};
};

export default useListPlatformConfigConstants;
