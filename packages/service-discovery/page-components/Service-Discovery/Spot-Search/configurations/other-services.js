import {
	IcMAppFinance,
	IcMAppInsurance,
	IcMAppLicenses,
	IcMAppLocalsHandling,
	IcMAppLogistics,
	IcMAppMachineIntelligence,
} from '@cogoport/icons-react';

const other_services = [
	{
		label : 'Tranport Goods',
		value : 'tranport_goods',
		icon  : IcMAppLogistics,
	},
	{
		label : 'Locals Handling',
		value : 'locals_handling',
		icon  : IcMAppLocalsHandling,
	},
	{
		label : 'Licensing & Docs',
		value : 'air_freight',
		icon  : IcMAppLicenses,
	},
	{
		label : 'Cargo Insurance',
		value : 'ftl_freight',
		icon  : IcMAppInsurance,
	},
	{
		label : 'Trade Finance',
		value : 'ltl_freight',
		icon  : IcMAppFinance,
	},
	{
		label : 'Trade Intelligence',
		value : 'trailer_freight',
		icon  : IcMAppMachineIntelligence,
	},
	{
		label : 'SAAS Subscription',
		value : 'haulage_freight',
		icon  : IcMAppLogistics,
	},
];
export default other_services;
