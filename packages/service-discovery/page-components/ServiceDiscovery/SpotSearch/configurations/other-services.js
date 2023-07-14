import {
	IcMAppFinance,
	IcMAppInsurance,
	IcMAppLicenses,
	IcMAppLocalsHandling,
	IcMAppLogistics,
	IcMAppMachineIntelligence,
	IcMAppCustoms,
} from '@cogoport/icons-react';

const other_services = [
	{
		label        : 'Customs Clearance',
		value        : 'customs',
		icon         : IcMAppCustoms,
		is_available : false,
	},
	{
		label        : 'Locals Handling',
		value        : 'locals',
		icon         : IcMAppLocalsHandling,
		is_available : false,
	},
	{
		label        : 'Licensing & Docs',
		value        : 'licensing',
		icon         : IcMAppLicenses,
		is_available : false,
	},
	{
		label        : 'Cargo Insurance',
		value        : 'insurance',
		icon         : IcMAppInsurance,
		is_available : false,
	},
	{
		label        : 'Trade Finance',
		value        : 'finance',
		icon         : IcMAppFinance,
		is_available : false,
	},
	{
		label        : 'Trade Intelligence',
		value        : 'intelligence',
		icon         : IcMAppMachineIntelligence,
		is_available : false,
	},
	{
		label        : 'SAAS Subscription',
		value        : 'saas',
		icon         : IcMAppLogistics,
		is_available : false,
	},
];
export default other_services;
