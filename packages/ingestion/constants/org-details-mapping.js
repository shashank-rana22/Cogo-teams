export const CONSTANT_KEYS = {
	LEAD              : 'lead',
	CHANNEL_PARTNER   : 'partner',
	IMPORTER_EXPORTER : 'organization',
};

export const ProviderCpOptions = [
	{ key: 'a. Channel Partner (buy persona)', type: 'CPBuy' },
	{ key: 'b. Channel Partner (sell persona)', type: 'CPSell' },
	{ key: 'c. Channel Partner (buy and sell persona)', type: 'CPBuyAndSell' },
];

export const ProviderLeadOptions = [
	{ key: 'a. Importer/ Exporter', type: 'IE' },
	{ key: 'b. Service Provider', type: 'SP' },
];

export const IS_CHANNEL_PARTNER_MAPPING = {
	IE           : false,
	SP           : true,
	CPSell       : true,
	CPBuy        : true,
	CPBuyAndSell : true,
};
