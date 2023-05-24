import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCogoverseDashboard = ({ date = {} }) => {
	const { startDate = '', endDate = '' } = date;
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoverse_dashboard',
		method : 'GET',
	}, { manual: true });

	const getCogoverseDashboard = useCallback(async () => {
		try {
			await trigger({
				params: {
					start_date : startDate || undefined,
					end_date   : endDate || undefined,

				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [endDate, startDate, trigger]);

	useEffect(() => {
		getCogoverseDashboard();
	}, [getCogoverseDashboard]);

	return {
		statsLoading : loading,
		stats        : data,
	};
};

export default useGetCogoverseDashboard;
