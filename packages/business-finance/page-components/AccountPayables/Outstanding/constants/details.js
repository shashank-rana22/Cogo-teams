import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

export const details = ({ entityCode }) => [
	{
		label : 'Serial Id',
		key   : 'organizationSerialId',
	},
	{
		label : 'TradeParty Serial Id',
		key   : 'tradePartySerialId',
	},
	{
		label : ENTITY_FEATURE_MAPPING?.[entityCode]?.labels?.tax_label,
		key   : 'registrationNumber',
	},
	{
		label : ENTITY_FEATURE_MAPPING?.[entityCode]?.labels?.sage_label,
		key   : 'sageId',
	},
	{
		label : 'Company Type',
		key   : 'companyType',
	},
];
