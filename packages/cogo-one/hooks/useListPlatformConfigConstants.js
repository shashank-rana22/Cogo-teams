import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getParams = ({ keyName = '' }) => ({
	filters: {
		key_name: keyName || undefined,
	},
});

const useListPlatformConfigConstants = ({ keyName = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_platform_config_constants',
		method : 'get',
	}, { manual: true });

	const listPlatformConfigConstants = useCallback(() => {
		try {
			trigger({
				params: getParams({ keyName }),
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	}, [keyName, trigger]);

	return {
		listPlatformConfigConstants,
		configLoading : loading,
		configData    : data,
	};
};

export default useListPlatformConfigConstants;
