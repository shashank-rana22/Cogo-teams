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
		'field_executive',
	],
	shipment_info : {},
	default_tab   : 'field_executive',
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
		start_tracking_visible   : true,
		move_document_visible    : false,
	},
	emails: {
		tab_title: 'Emails',
	},
	cancel_shipment: {
		can_cancel   : false,
		list_reasons : {
			stakeholder_type: [
				'field_executive',
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
