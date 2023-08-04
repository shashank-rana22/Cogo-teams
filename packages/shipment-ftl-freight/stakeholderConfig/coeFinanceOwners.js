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
		'documents',
		'emails',
		'field_executive',
		'tracking',
		'purchase',
		'sales',
	],
	shipment_info : {},
	default_tab   : 'overview',
	overview      : {
		tab_title: 'Overview',
	},
	tasks: {
		tab_title: 'Timeline and Tasks',
	},
	documents: {
		tab_title: 'Documents',
	},
	field_executive: {
		tab_title: 'Field Executive',
	},
	sales: {
		tab_title: 'Sales Live Invoice',
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'admin',
			],
		},
		role: 'sales',
	},
	tracking: {
		tab_title: 'Tracking',
	},
	purchase: {
		tab_title: 'Purchase Live Invoice',
	},
};
