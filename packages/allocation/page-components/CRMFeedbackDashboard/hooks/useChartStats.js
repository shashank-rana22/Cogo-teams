import { useAllocationRequest } from '@cogoport/request';

const API_DATA_MAPPING = {
	feedbacks_received: {
		endpoint : 'feedback_stats',
		authkey  : 'get_allocation_feedback_stats',
	},
	requests_sent: {
		endpoint : 'feedback_request_stats',
		authkey  : 'get_allocation_feedback_request_stats',
	},
};

const useFeedbackStats = ({ activeTab, filters = {} }) => {
	const { endpoint, authkey } = API_DATA_MAPPING[activeTab] || {};

	const [{ data = [], loading = false }] = useAllocationRequest({
		url    : endpoint,
		method : 'GET',
		authkey,
		params : { filters },
	}, { manual: false });

	return {
		loading,
		stats: data,
	};
};

export default useFeedbackStats;
