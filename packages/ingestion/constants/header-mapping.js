export const CONSTANT_KEYS = {
	CHOOSE          : 'chooseModal',
	ORG_DETAILS     : 'orgDetails',
	PROVIDER_SELECT : 'providerSelect',
	UPLOAD          : 'uploadModal',
};

export const REDIRECT_LINK_MAPPING = {
	true_service_provider   : '/crm/supply?lifecycleStage=enriched',
	false_importer_exporter : '/lead-management?lifecycleStage=enriched',
	true_importer_exporter  : '/channel-partner-management?selectedLifecycleStage=enriched',
};

export const REDIRECT_MAPPING = {
	true_service_provider   : 'Supply CRM',
	false_importer_exporter : 'Sales CRM',
	true_importer_exporter  : 'PRM',
};

export const TERMS_MAPPING = {
	TERM     : 'terms',
	TEMPLATE : 'template',
};
