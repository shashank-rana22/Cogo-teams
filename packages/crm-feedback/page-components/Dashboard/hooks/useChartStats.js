// import { useAllocationRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';

const useFeedbackStats = (activeTab = '') => {
	// const {
	// 	profile = {},
	// } = useSelector((state) => state);

	let data = {};
	if (activeTab === 'feedbacks_received') {
		data = {
			type_address          : 30,
			type_user_information : 70,
			email                 : 5,
			mobile_number         : 8,
			work_scopes           : 10,
			address               : 15,
			gstin                 : 12,
			others                : 20,
		};
	} else if (activeTab === 'requests_sent') {
		data = {
			response_received     : 10,
			request_created       : 20,
			tat_response_received : 30,
			tat_request_created   : 40,
		};
	}

	// const [{ loading, data }, refetch] = useAllocationRequest({
	// 	url     : '/feedback_request_stats',
	// 	method  : 'get',
	// 	authkey : 'get_allocation_feedback_request_stats',
	// 	params  : {
	// 		user_id    : profile.user?.id,
	// 		partner_id : profile.partner?.id,
	// 	},
	// }, { manual: false });

	return {
		// loading,
		stats: data,
	};
};

export default useFeedbackStats;
