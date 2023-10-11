import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetDashboardSummary = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_dashboard_summary',
	}, { manual: true });

	const getDashboardSummary = useCallback(
		() => {
			trigger();
		},
		[trigger],
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
