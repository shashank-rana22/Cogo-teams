const ihls = {
	'/[partner_id]/ihls/file-upload': {
		navigation : 'ihls-file_upload',
		isMainNav  : true,
	},
	'/[partner_id]/ihls/athena-dashboard': {
		layoutType : 'no_header',
		navigation : 'ihls-athena_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/ihls/athena-dashboard/report': {
		layoutType : 'no_header',
		navigation : 'ihls-athena_dashboard',
		isMainNav  : false,
	},
	'/[partner_id]/ihls/lead-data-pipeline': {
		navigation : 'ihls-lead_data_pipeline',
		isMainNav  : true,
	},
};

module.exports = ihls;
