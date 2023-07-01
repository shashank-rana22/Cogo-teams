const nodeColumns = ({ item = {} }) => {
	const { immediate_child_count = 0, total_child_count = 0, cogopoints = {}, direct_data = {} } = item;

	const { affiliate_count = 0, active_user_count = 0, reset_user_count = 0 } = direct_data;

	const {
		network_cogopoint_earned = 0,
		network_cogopoint_estimated = 0,
		referral_cogopoint_earned = 0,
		referral_cogopoint_estimated = 0,
	} = cogopoints;

	const directNode = [
		{
			title : 'Affiliate',
			count : affiliate_count,
		},
		{
			title : 'Active',
			count : active_user_count,
		},
		{
			title : 'Inactive',
			count : reset_user_count,
		},
	];

	const networkNode = [
		{
			title : 'Nodes',
			count : total_child_count - immediate_child_count,
		},

	];

	const allotedCogopoints = [
		{
			title : 'Direct',
			count : referral_cogopoint_earned,
		},
		{
			title : 'Indirect',
			count : network_cogopoint_earned,
		},

	];

	const holdedCogopoints = [
		{
			title : 'Direct',
			count : referral_cogopoint_estimated,
		},
		{
			title : 'Indirect',
			count : network_cogopoint_estimated,
		},

	];
	return { directNode, holdedCogopoints, allotedCogopoints, networkNode };
};

export default nodeColumns;
