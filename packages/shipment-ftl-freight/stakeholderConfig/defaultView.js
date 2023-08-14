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
	],
	shipment_info : {},
	default_tab   : 'overview',
	overview      : {
		tab_title: 'Overview',
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
