const getSecondaryTabOptions = ({ stats = {} }) => ({
	active: {
		key   : 'active',
		title : 'active',
		value : stats.requested_feedback_request_count,
	},
	responded: {
		key   : 'responded',
		title : 'Ongoing',
		value : stats.total_ongoing_request_count,
	},
	success: {
		key   : 'success',
		title : 'Success',
		value : stats.success_feedback_request_count,
	},
	failed: {
		key   : 'failed',
		title : 'Failed',
		value : stats.failed_feedback_request_count,
	},

});

export default getSecondaryTabOptions;
