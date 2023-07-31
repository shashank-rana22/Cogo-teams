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
		tab_title             : 'Timeline and Tasks',
		show_booking_req      : true,
		checked_show_my_tasks : false,
		is_task_assigned      : false,
		can_reassign_task     : true,
	},
	field_executive: {
		tab_title: 'Field Executive',
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
		can_cancel   : true,
		list_reasons : {
			stakeholder_type: ['superadmin'],
		},
		role: 'sales',
	},
	tracking: {
		tab_title: 'Tracking',
	},
	edit_supplier       : true,
	cancel_service      : true,
	additional_services : {
		action_buttons: {
			reallocate      : false,
			review_comments : false,
		},
		add_rate: {
			'status::amendment_requested_by_importer_exporter' : false,
			'status::cancelled_by_supplier'                    : false,
		},
	},
};
