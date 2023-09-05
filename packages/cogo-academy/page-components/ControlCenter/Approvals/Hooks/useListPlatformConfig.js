import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListPlatformConfigConstants() {
	const [{ loading, data = {} }, trigger] = useRequest({
		url    : '/list_platform_config_constants',
		method : 'GET',
	}, { manual: true });

	const listPlatformConfigConstants = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						key_name : 'COGO_ACADEMY_APPROVAL_EMAILS',
						service  : 'CogoAcademy',
					},
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [trigger]);

	useEffect(() => {
		listPlatformConfigConstants();
	}, [listPlatformConfigConstants]);

	return {
		loading,
		data,
		listPlatformConfigConstants,
	};
}

export default useListPlatformConfigConstants;
