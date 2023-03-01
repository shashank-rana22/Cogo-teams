export const LIST_PRIMARY_COLUMNS_MAPPING = {
	enrichment_requests: ['id', 'business_name', 'created_at', 'registration_number', 'action'],

};

export const LIST_SECONDARY_COLUMNS_MAPPING = {
	submitted_requests : ['id', 'business_name', 'created_at', 'registration_number', 'edit'],
	uploaded_files     : ['id', 'file_name', 'upload_date', 'organizations', 'num_pocs', 'status', 'download'],
};
