import { useAllocationRequest } from '@cogoport/request';

const useFeedbackStats = (activeTab = '') => {
	// let data = {};
	let url = '';
	let authkey = '';
	if (activeTab === 'feedbacks_received') {
		// data = {
		// 	type: {
		// 		address          : 30,
		// 		user_information : 70,
		// 	},
		// 	sub_type: {
		// 		email         : 5,
		// 		mobile_number : 8,
		// 		work_scopes   : 10,
		// 		address       : 15,
		// 		gstin         : 12,
		// 		others        : 20,
		// 	},
		// };
		url = '/feedback_stats';
		authkey = 'get_allocation_feedback_request_stats';
	} else if (activeTab === 'requests_sent') {
		// data = {
		// 	response_received     : 10,
		// 	request_created       : 20,
		// 	tat_response_received : 30,
		// 	tat_request_created   : 40,
		// };
		url = '/feedback_request_stats';
		authkey = 'get_allocation_feedback_request_stats';
	}

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
