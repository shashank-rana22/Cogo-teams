import { useAllocationRequest } from '@cogoport/request';

const useFeedbackStats = ({ activeTab = '' }) => {
	const url = activeTab === 'feedbacks_received'
		? 'feedback_stats'
		: 'feedback_request_stats';

	const authkey = activeTab === 'feedbacks_received'
		? 'get_allocation_feedback_stats'
		: 'get_allocation_feedback_request_stats';

	const [{ data = [], loading = false }] = useAllocationRequest({
		url,
		method: 'GET',
		authkey,
	}, { manual: false });

	return {
		loading,
		stats: data,
	};
};

export default useFeedbackStats;
