import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdatePlatformConfigMapping = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_platform_config_constant_mapping',
		method : 'POST',
	}, { manual: true });

	const updatePlatformConfigMapping = async ({ payload }) => {
		try {
			await trigger({
				data: {
					...payload,
				},
			});
			Toast.success('Updated the Margin Threshold Successfully ');
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updatePlatformConfigMapping,
		loading,

	};
};

export default useUpdatePlatformConfigMapping;
