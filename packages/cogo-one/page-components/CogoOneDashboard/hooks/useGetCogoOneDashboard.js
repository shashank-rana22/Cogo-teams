/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetCogoOneDashboard({ timeline, selectedTimeline }) {
	const { date = '', from = '', to = '' } = selectedTimeline || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogo_one_dashboard',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = async () => {
		try {
			await trigger({
				params: {
					timeline : timeline || 'day',
					date     : timeline !== 'week' ? date : undefined,
					from     : timeline === 'week' ? from : undefined,
					to       : timeline === 'week' ? to : undefined,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		getCogoOneDashboard();
	}, [timeline, selectedTimeline]);

	return {
		loading,
		getCogoOneDashboard,
		listData: data,
	};
}
export default useGetCogoOneDashboard;
