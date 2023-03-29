import { useAllocationRequest } from '@cogoport/request';

const useFeedbackStats = ({ activeTab = '' }) => {
	// let url = '';
	// let authkey = '';

	// switch (activeTab) {
	// 	case 'feedbacks_received':
	// 		url = '/feedback_stats';
	// 		authkey = 'get_allocation_feedback_stats';
	// 		break;
	// 	case 'requests_sent':
	// 		url = '/feedback_request_stats';
	// 		authkey = 'get_allocation_feedback_request_stats';
	// 		break;
	// 	default:
	// 		break;
	// }

	const url = 		activeTab === 'feedbacks_received'
		? '/feedback_stats'
		:			'/feedback_request_stats';

	const authkey = 		activeTab === 'feedbacks_received'
		? 'get_allocation_feedback_stats'
		:			'get_allocation_feedback_request_stats';

	const [{ loading, data }] = useAllocationRequest({
		url,
		method : 'get',
		authkey,
		params : {},
	}, { manual: false });

	return {
		loading,
		stats: data,
	};
};

export default useFeedbackStats;
