import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetPlanList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page: 1,
	});

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_plans',
	}, { manual: true });

	const refetchPlanList = useCallback(async () => {
		const { page = 1 } = globalFilters;
		try {
			await trigger({
				params: {
					filters: { plan_type: 'P' },
					page,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [globalFilters, trigger]);

	const pageChangeHandler = (page) => {
		setGlobalFilters((prev) => ({ ...prev, page }));
	};

	useEffect(() => {
		refetchPlanList();
	}, [globalFilters, refetchPlanList]);

	return {
		planList: data, loading, setGlobalFilters, pageChangeHandler,
	};
};
export default useGetPlanList;
