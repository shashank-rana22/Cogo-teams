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
};

module.exports = ihls;
