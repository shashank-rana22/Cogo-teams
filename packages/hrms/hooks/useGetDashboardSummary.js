import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetDashboardSummary = (isEmployeeDashboardActive) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_dashboard_summary',
	}, { manual: true });

	const getDashboardSummary = useCallback(
		() => {
			trigger({
				params: {
					dashboard_view: isEmployeeDashboardActive === false ? 'employee' : undefined,
				},
			});
		},
		[isEmployeeDashboardActive, trigger],
	);

	useEffect(() => {
		try {
			getDashboardSummary();
		} catch (error) {
			console.log('err', error);
		}
	}, [getDashboardSummary]);

	return { loading, data };
};

export default useGetDashboardSummary;
