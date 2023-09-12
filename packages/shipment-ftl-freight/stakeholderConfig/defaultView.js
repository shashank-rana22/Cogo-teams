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
	],
	shipment_info : {},
	default_tab   : 'overview',
	overview      : {
		tab_title            : 'Overview',
		enable_consolidation : true,
	},
	tasks: {
		tab_title: 'Timeline and Tasks',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'other',
			],
		},
		role: 'sales',
	},
};
