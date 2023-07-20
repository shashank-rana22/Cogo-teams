const ENRICHMENT_API_MAPPING = {

	manual_enrichment: {
		api       : 'feedback_requests',
		authkey   : 'get_allocation_feedback_requests',
		isMainApi : true,
	},
	file_management: {
		api       : 'feedback_response_sheets',
		authkey   : 'get_allocation_feedback_response_sheets',
		isMainApi : false,

	},

};
export default ENRICHMENT_API_MAPPING;
