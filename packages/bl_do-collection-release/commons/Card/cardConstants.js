export const SUCCESS_MSG = {
	knockoff_pending   : 'Invoice Knocked Off successfully',
	collection_pending : 'Details have been updated successfully',
	under_collection   : 'Document Uploaded successfully',
	collected          : 'Release Mode have been updated successfully',
	released           : 'Details have been updated successfully',
	surrendered        : 'BL has been surrendered successfully',
};

export const TASK_FILTER = {
	knockoff_pending: {
		bl: {
			import : 'knockoff_bl_invoices',
			export : 'knockoff_invoices',
		},
		do: {
			import: [
				'generate_do_noc_certificate',
				'generate_do_certificate',
				'upload_security_dd',
				'knockoff_invoices',
			],
			export: [
				'generate_do_noc_certificate',
				'generate_do_certificate',
				'knockoff_do_invoices',
			],
		},
	},
	collection_pending: {
		bl: {
			import : 'update_do_collection_details',
			export : 'update_collection_details',
		},
		do: {
			import : 'update_collection_details',
			export : 'update_bl_collection_details',
		},
	},
	under_collection: {
		bl: {
			import : 'upload_bill_of_lading',
			export : 'upload_bill_of_lading',
		},
		do: {
			import: ['upload_endorsed_bill_of_lading', 'upload_delivery_order', 'generate_do_noc_certificat',
				'generate_do_certificate', 'upload_security_dd'],
			export: ['upload_endorsed_bill_of_lading', 'upload_delivery_order', 'generate_do_noc_certificat',
				'generate_do_certificate', 'upload_security_dd'],
		},
	},
	collected: {
		bl: {
			import : ['mark_bl_released'],
			export : 'mark_bl_released',
		},
		do: {
			import : ['mark_do_released', 'upload_delivery_order'],
			export : ['mark_do_released', 'upload_delivery_order'],
		},
	},
	released    : 'mark_bl_delivered',
	surrendered : 'mark_bl_surrendered',
};

export const ASSIGNED_STAKEHOLDER_MAPPING = {
	knockoff_pending   : 'collection_desk',
	collection_pending : 'collection_desk',
	under_collection   : undefined,
	collected          : 'release_desk',
	released           : 'release_desk',
	surrendered        : 'release_desk',
};

export const STAKEHOLDER_MAPPING = {
	service_ops2    : 'Document Desk:',
	booking_agent   : 'KAM:',
	release_desk    : 'Release Desk:',
	collection_desk : 'Collection Desk:',
};
