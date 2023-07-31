export default {
	features: [
		'shipment_info',
		'shipment_header',
		'timeline',
		'poc',
		'sop',
		'chat',
		'cancel_details',
		'overview',
		'tasks',
		'documents',
		'emails',
		'tracking',
		'purchase',
	],
	visible_tabs: [
		'overview',
		'tasks',
		'documents',
		'emails',
		'tracking',
		'purchase',
	],
	shipment_info : {},
	default_tab   : 'tasks',
	overview      : {
		tab_title: 'Overview',
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
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'booking_desk',
			],
		},
		role: 'supply',
	},
	tracking: {
		tab_title: 'Tracking',
	},
	purchase: {
		tab_title: 'Purchase Live Invoice',
	},
};
