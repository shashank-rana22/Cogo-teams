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
		'purchase',
		'field_executive',
		'documents',
	],
	shipment_info : {},
	default_tab   : 'overview',
	overview      : {
		tab_title: 'Overview',
	},
	field_executive: {
		tab_title                : 'Field Executive',
		document_history_visible : true,
		edit_details_visible     : false,
		start_tracking_visible   : false,
		move_document_visible    : true,
	},
	tasks: {
		tab_title: 'Timeline and Tasks',
	},
	documents: {
		tab_title: 'Documents',
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
