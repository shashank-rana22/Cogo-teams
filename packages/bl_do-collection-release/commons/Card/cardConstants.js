export const successMsg = {
	knockoff_pending   : 'Invoice Knocked Off successfully',
	collection_pending : 'Details have been updated successfully',
	under_collection   : 'Document Uploaded successfully',
	collected          : 'Release Mode have been updated successfully',
	released           : 'Details have been updated successfully',
	surrendered        : 'BL has been surrendered successfully',
};

export const taskFilter = {
	knockoff_pending: {
		import: [
			'generate_do_noc_certificate',
			'generate_do_certificate',
			'upload_security_dd',
			'knockoff_invoices',
		],
		export: 'knockoff_invoices',
	},
	collection_pending : 'update_collection_details',
	under_collection   : {
		import : 'upload_endorsed_bill_of_lading',
		export : 'upload_bill_of_lading',
	},
	collected: {
		import : ['mark_do_released', 'upload_delivery_order'],
		export : 'mark_bl_released',
	},
	released    : 'mark_bl_delivered',
	surrendered : 'mark_bl_surrendered',
};

export const assigned_stakeholder_mapping = {
	knockoff_pending   : 'collection_desk',
	collection_pending : 'collection_desk',
	under_collection   : undefined,
	collected          : 'release_desk',
	released           : 'release_desk',
	surrendered        : 'collection_desk',
};

export const stakeholderMappings = {
	service_ops2    : 'Document Desk:',
	booking_agent   : 'KAM:',
	release_desk    : 'Release Desk:',
	collection_desk : 'Collection Desk:',
};
