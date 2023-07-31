export default {
	features: [
		'shipment_info',
		'shipment_header',
		'timeline',
		'chat',
		'cancel_details',
	],
	visible_tabs: [
		'overview',
		'tasks',
		'documents',
		'field_executive',
		'tracking',
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
	field_executive: {
		tab_title: 'Field Executive',
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'ftl_ground_ops',
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
