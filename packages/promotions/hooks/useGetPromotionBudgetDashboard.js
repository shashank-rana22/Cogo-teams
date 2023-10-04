import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPromotionBudgetDashboard = ({
	defaultParams = {},
}) => {
	const [data, setData] = useState({});
	const { currency = '' } = defaultParams || {};
	const [params, setParams] = useState({
		currency,
	});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_promotion_budget_dashboard',
			method : 'GET',
			params : {
				...(defaultParams || {}),
				...(params || {}),
			},
		},
		{ manual: true },
	);

	const fetchDashboardData = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData, params, setParams]);

	return {
		data,
		loading,
		params,
		setParams,
		fetchDashboardData,
	};
};

export default useGetPromotionBudgetDashboard;
