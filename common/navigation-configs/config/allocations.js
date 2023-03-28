const allocations = {
	'/[partner_id]/allocation/core-engine': {
		navigation : 'allocations-core_engine',
		isMainNav  : true,
	},
	'/[partner_id]/allocation/core-engine/details/[instance_id]': {
		navigation : 'allocations-core_engine',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/crm-feedback-dashboard': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/allocation/feedbacks/[organization_id]': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/requests/[organization_id]': {
		navigation : 'crm_feedback_dashboard',
		isMainNav  : false,
	},
};

module.exports = allocations;
