import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPromotionBudgetDashboard = ({
	selectedCurrency = 'USD',
}) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_promotion_budget_dashboard',
			method : 'GET',
			params : {
				currency: selectedCurrency,
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
	}, [fetchDashboardData, selectedCurrency]);

	const refetch = () => {
		fetchDashboardData();
	};

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetPromotionBudgetDashboard;
