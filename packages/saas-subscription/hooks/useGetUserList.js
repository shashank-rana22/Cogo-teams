import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetUserList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page             : 1,
		customer_segment : 'platform_user',
		search           : '',
	});
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_subscription_customers',
	}, { manual: true });

	// getting cancel error by removing async await
	const refectUserList = useCallback(async () => {
		const { page, search, ...rest } = globalFilters;
		try {
			await trigger({
				params: {
					service_object_required : true,
					filters                 : { q: search, ...rest },
					page,
				},
			});
		} catch (err) {
			if (err.code !== 'ERR_CANCELED') Toast.error(getApiErrorString(err.response?.data));
		}
	}, [globalFilters, trigger]);

	useEffect(() => {
		refectUserList();
	}, [globalFilters, refectUserList]);

	return {
		userList: data, loading, refectUserList, globalFilters, setGlobalFilters,
	};
};

export default useGetUserList;
