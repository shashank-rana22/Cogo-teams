/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetCogoOneDashboard(
	{ timeline = '', selectedTimeline = {}, selectedItem = '', partnerUserId = '', isAgentView },
) {
	// const { query } = useRouter();
	// const { id : agentId = '' } = query || {};
	const { date = '' } = selectedTimeline || {};
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogo_one_dashboard',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = async (agentId) => {
		try {
			await trigger({
				params: {
					timeline      : timeline || 'day',
					timeline_date : date || new Date(),
					// timeline_date : '2023-02-28' || new Date(),
					agent_id      : (partnerUserId && isAgentView) || agentId ? agentId || partnerUserId : undefined,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		// console.log('🚀useGetCogoOneDashboard ~ selectedItem:', selectedItem);
		// console.log('🚀useGetCogoOneDashboard ~ selectedTimeline:', selectedTimeline);
		// console.log('🚀useGetCogoOneDashboard ~ timeline:', timeline);
		getCogoOneDashboard();
	}, [timeline, selectedItem]);

	return {
		loading,
		getCogoOneDashboard,
		listData: data,
	};
}
export default useGetCogoOneDashboard;
