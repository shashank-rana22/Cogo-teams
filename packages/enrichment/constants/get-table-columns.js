export const LIST_PRIMARY_COLUMNS_MAPPING = {
	enrichment_requests: ['id', 'business_name', 'created_at', 'registration_number', 'address', 'action'],

};

export const LIST_SECONDARY_COLUMNS_MAPPING = {
	submitted_requests : ['id', 'business_name', 'created_at', 'registration_number', 'address', 'edit'],
	uploaded_files     : ['file_name', 'upload_date', 'organizations', 'num_pocs', 'download'],
};
