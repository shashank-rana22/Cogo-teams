export const CONSTANT_KEYS = {
	lead: 'lead',
};

export const ProviderLeadOptions = [
	{ key: 'a. Importer/ Exporter', type: 'IE' },
	{ key: 'b. Service Provider', type: 'SP' },
	{ key: 'c. Channel Partner', type: 'CP' },
];

export const IS_CHANNEL_PARTNER_MAPPING = {
	IE : false,
	SP : true,
	CP : true,
};

export const ACCOUNT_TYPE_MAPPING = {
	IE : 'importer_exporter',
	SP : 'service_provider',
	CP : 'importer_exporter',
};
