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
		'field_executive',
		'sales',
		'tracking',
		'purchase',
	],
	shipment_info   : {},
	shipment_header : {
		add_po_number: true,
	},
	default_tab : 'tasks',
	overview    : {
		tab_title: 'Overview',
	},
	tasks: {
		tab_title: 'Timeline and Tasks',
	},
	field_executive: {
		tab_title                : 'Field Executive',
		document_history_visible : true,
		edit_details_visible     : true,
		start_tracking_visible   : true,
		move_document_visible    : true,
	},
	sales: {
		tab_title: 'Sales Live Invoice',
	},
	purchase: {
		tab_title: 'Purchase Live Invoice',
	},
	documents: {
		tab_title      : 'Documents',
		default_wallet : 'trade_documents',
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: ['admin'],
		},
		role: 'sales',
	},
	tracking: {
		tab_title: 'Tracking',
	},
	edit_supplier       : true,
	cancel_service      : true,
	additional_services : {},
};
