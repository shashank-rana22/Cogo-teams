const kyc = [
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_services',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'submit_organization_kyc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'verify_user_mobile',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'update_organization_service',
		access_type  : 'private',
		service_name : 'organization',
	},
];
export default kyc;
