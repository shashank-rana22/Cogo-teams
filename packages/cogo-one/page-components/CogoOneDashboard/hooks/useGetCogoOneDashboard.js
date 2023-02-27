/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetCogoOneDashboard({ timeline, selectedTimeline, selectedItem }) {
	const { date = '', from = '', to = '' } = selectedTimeline || {};
	console.log(selectedTimeline, 'selectedTimeline');
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogo_one_dashboard',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = async () => {
		try {
			await trigger({
				params: {
					timeline      : timeline || 'day',
					timeline_date : date || new Date(),
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		getCogoOneDashboard();
	}, [timeline, selectedTimeline, selectedItem]);

	return {
		loading,
		getCogoOneDashboard,
		listData: data,
	};
}
export default useGetCogoOneDashboard;
