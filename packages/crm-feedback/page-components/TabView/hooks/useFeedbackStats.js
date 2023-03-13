import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useFeedbackStats = () => {
	// const {
	// 	profile = {},
	// } = useSelector((state) => state);

	// const [{ loading, data }, refetch] = useAllocationRequest({
	// 	url     : '/feedback_request_stats',
	// 	method  : 'get',
	// 	authkey : 'get_allocation_feedback_request_stats',
	// 	params  : {
	// 		user_id    : profile.user?.id,
	// 		partner_id : profile.partner?.id,
	// 	},
	// }, { manual: false });

	const data = [
		{
			id    : 'address',
			label : 'Address',
			value : 60,
			color : 'hsl(15, 70%, 50%)',
		},
		{
			id    : 'user_information',
			label : 'User Information',
			value : 40,
			color : 'hsl(217, 70%, 50%)',
		},
	];

	return {
		// loading,
		stats: data,
		// refetch,
	};
};

export default useFeedbackStats;
