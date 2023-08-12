import { IcAInsurance, IcAOverseasAgents, IcATransactionHistory } from '@cogoport/icons-react';

export const ADD_ON_SERVICES_TAB_MAPPING = [
	{
		icon       : IcATransactionHistory,
		key        : 'manage_subscriptions',
		label      : 'Manage Subscriptions',
		is_enabled : false,
	},
	{
		icon       : IcAInsurance,
		key        : 'marine_insurance',
		label      : 'Marine Insurance',
		is_enabled : false,
	},
	{
		icon       : IcAOverseasAgents,
		key        : 'export_factoring',
		label      : 'Export Factoring',
		is_enabled : false,
	},
];

export const POC_BILLING_ITEMS = ['poc_name', 'email', 'phone_number'];

export const MANDENTORY_BILLING_ITEMS = [
	'name', 'address', 'country_id',
	'pincode', 'state', 'city', 'include_tax_number',
];
