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
		tab_title                : 'Field Executive',
		document_history_visible : true,
		edit_details_visible     : true,
		start_tracking_visible   : false,
		move_document_visible    : true,
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'document_desk',
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
