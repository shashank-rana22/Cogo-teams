const getColumnConfiguration = ({ primaryTab = '' }) => {
	const COLUMNS_MAPPING = {
		manual_enrichment: [
			'id',
			'business_name',
			'registration_number',
			'requested_agent',
			'created_at',
			'action',
			'status',
		],
		file_management: [
			'file_id',
			'file_name',
			'upload_date',
			'error_sheet_url',
			'sheet_url',
			'status',
		],
	};

	return COLUMNS_MAPPING[primaryTab];
};

export default getColumnConfiguration;
