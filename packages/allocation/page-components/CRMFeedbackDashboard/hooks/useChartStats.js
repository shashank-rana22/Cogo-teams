import { useAllocationRequest } from '@cogoport/request';

const MINIMUM_COUNT_VALUE = 0;

const API_DATA_MAPPING = {
	feedbacks_received: {
		endpoint : 'feedback_stats',
		authkey  : 'get_allocation_feedback_stats',
		isEmpty  : (data) => Object.values(data).every(
			(item) => Object.values(item).every((value) => value === MINIMUM_COUNT_VALUE),
		),
	},
	requests_sent: {
		endpoint : 'feedback_request_stats',
		authkey  : 'get_allocation_feedback_request_stats',
		isEmpty  : (data) => Object.values(data).every((item) => item === MINIMUM_COUNT_VALUE),
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
		stats   : data,
		isEmpty : !loading && (API_DATA_MAPPING[activeTab] || {}).isEmpty(data),
	};
};

export default useFeedbackStats;
