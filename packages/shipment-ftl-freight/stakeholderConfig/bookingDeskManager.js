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
		'documents',
		'emails',
		'tracking',
		'purchase',
		'field_executive',
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
	emails: {
		tab_title: 'Emails',
	},
	field_executive: {
		tab_title                : 'Field Executive',
		document_history_visible : true,
		edit_details_visible     : false,
		start_tracking_visible   : false,
		move_document_visible    : true,
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
