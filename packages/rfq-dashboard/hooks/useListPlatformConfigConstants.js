import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const FIRST_PLATFORM_CONSTANT = 0;

const useListPlatformConfigConstants = ({ setValue }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_platform_config_constants',
		method : 'GET',
	}, { manual: true });

	const listPlatformConfigConstants = async () => {
		try {
			const response = await trigger({
				params: {
					filters: {
						key_name: 'THRESHOLD_MARGIN_PERCENTAGE',
					},
				},
			});
			setValue('minimum_profitability', response?.data?.list?.
				[FIRST_PLATFORM_CONSTANT]?.platform_config_constant_mappings?.[FIRST_PLATFORM_CONSTANT]?.value);
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
