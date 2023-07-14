export const PROVIDER_LEAD_OPTIONS = [
	{ label: 'a. Importer/ Exporter', type: 'IE' },
	{ label: 'b. Service Provider', type: 'SP' },
	{ label: 'c. Channel Partner', type: 'CP' },
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
