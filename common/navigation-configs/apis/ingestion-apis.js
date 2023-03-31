const ingestion = [
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'create_ingestion',
		access_type  : 'private',
		service_name : 'ingestion',
	},
	{
		api          : 'list_ingestion_requests',
		access_type  : 'private',
		service_name : 'ingestion',
	},
	{
		api          : 'list_ingestion_error_request_files',
		access_type  : 'private',
		service_name : 'ingestion',
	},
	{
		api          : 'get_ingestion_file_template',
		access_type  : 'private',
		service_name : 'ingestion',
	},
];

export default ingestion;
