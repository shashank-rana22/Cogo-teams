export const REGISTRATION_MAPPING = {
	P : 'proprietorship',
	F : 'LLP',
	C : 'company',
};
export const REGISTRATION_TYPE_INDEX = 3;
export const STATISTICS_HEAD_LIMIT_INDEX = 6;

export const STATISTICS_HEAD = [
	'segment', 'shipment', 'registration',
	'company_type', 'lifecycle_stage', 'source', 'enrichment_stats',
	'organization_users', 'user_contacts',
];

export const DEFAULT_LIST = {
	success:
	{
		label : 'Enriched',
		color : 'green',
	},
	processing: {
		label : 'Processing',
		color : 'yellow',
	},
	failed: {
		label : 'Failed',
		color : 'red',
	},
	pending: {
		label : 'Pending',
		color : 'blue',
	},
};

export const LIFECYCLE_STAGE = {
	transacting:
	{
		label : 'Transacting',
		color : '#FFAD5B',
	},
	enriched: {
		label : 'Enriched',
		color : '#69A5CD',
	},
	kyc_verified: {
		label : 'KYC Verified',
		color : '#B5AFD4',
	},
	sales_qualified: {
		label : 'Sales Qualified',
		color : '#76CEC1',
	},
	marketing_qualified: {
		label : 'Marketing Qualified',
		color : '#EE3425',
	},
};
