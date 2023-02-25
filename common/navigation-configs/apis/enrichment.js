const enrichment = [
	{
		api          : 'list_lead_organizations_enrichment',
		access_type  : 'private',
		feature      : 'enrichment',
		service_name : 'lead',

	},
	{
		api          : 'get_allocation_feedback_requests',
		access_type  : 'private',
		feature      : 'allocation',
		service_name : 'allocation',
	},

	{
		api          : 'get_allocation_feedback_responses',
		access_type  : 'private',
		feature      : 'allocation',
		service_name : 'allocation',
	},
	{
		api          : 'post_allocation_feedback_response_sheet',
		access_type  : 'private',
		feature      : 'allocation',
		service_name : 'allocation',
	},

	{
		api          : 'create_lead_organization_enrichment_response',
		access_type  : 'private',
		feature      : 'enrichment',
		service_name : 'lead',
	},

];

export default enrichment;
