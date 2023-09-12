export default {
	features: [
		'shipment_info',
		'shipment_header',
		'timeline',
		'poc',
		'sop',
		'chat',
		'cancel_details',
	],
	visible_tabs: [
		'overview',
		'tasks',
		'documents',
		'emails',
		'sales',
		'tracking',
	],
	shipment_info: {
		job_open_request: false,
	},
	default_tab : 'overview',
	overview    : {
		tab_title            : 'Overview',
		enable_consolidation : true,
	},
	tasks: {
		tab_title: 'Timeline and Tasks',
	},
	documents: {
		tab_title: 'Documents',
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : true,
		list_reasons : {
			stakeholder_type: [
				'booking_agent',
			],
		},
		role: 'sales',
	},
	tracking: {
		tab_title: 'Tracking',
	},
	sales: {
		tab_title: 'Sales Live Invoice',
	},
};
