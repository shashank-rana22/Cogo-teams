export const CONSTANT_KEYS = {
	CHOOSE          : 'chooseModal',
	ORG_DETAILS     : 'orgDetails',
	PROVIDER_SELECT : 'providerSelect',
	UPLOAD          : 'uploadModal',
};

export const REDIRECT_LINK_MAPPING = {
	is_cp_true_service_provider   : '/crm/supply?lifecycleStage=enriched',
	is_cp_false_importer_exporter : '/lead-management?lifecycleStage=enriched',
	is_cp_true_importer_exporter  : '/channel-partner-management?selectedLifecycleStage=enriched',
};

export const REDIRECT_MAPPING = {
	is_cp_true_service_provider   : 'Supply CRM',
	is_cp_false_importer_exporter : 'Sales CRM',
	is_cp_true_importer_exporter  : 'PRM',
};

export const TERMS_MAPPING = {
	TERM     : 'terms',
	TEMPLATE : 'template',
};
