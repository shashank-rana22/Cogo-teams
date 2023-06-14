import {
	IcMFcl,
	IcMLcl,
	IcMCustoms,
	IcMHaulage,
	IcMTrailorFull,
	IcMLtl,
	IcMAir,
	IcMCfs,
	IcMFtl,
} from '@cogoport/icons-react';

export const SERVICE_TYPE_MAPPING = {
	fcl_freight_service: {
		icon  : <IcMFcl width="25px" height="20px" color="#034afd" />,
		label : 'FCL',
	},
	lcl_freight_service: {
		icon  : <IcMLcl width="25px" height="20px" color="#89cad1" />,
		label : 'LCL',
	},
	air_freight_service: {
		icon  : <IcMAir width="25px" height="20px" color="#ee3425" />,
		label : 'AIR',
	},
	air_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#ee3425" />,
		label: 'AIR CUSTOMS',
	},
	fcl_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#034afd" />,
		label: 'FCL CUSTOMS',
	},
	lcl_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#89cad1" />,
		label: 'LCL CUSTOMS',
	},
	haulage_freight_service: {
		icon:
	<IcMHaulage width="25px" height="20px" color="#898fd1" />,
		label: 'HAULAGE',
	},
	trailer_freight_service: {
		icon:
	<IcMTrailorFull width="25px" height="20px" color="#898fd1" />,
		label: 'TRAILER',
	},
	ftl_freight_service : { icon: <IcMFtl width="25px" height="20px" color="#898fd1" />, label: 'FTL' },
	ltl_freight_service : { icon: <IcMLtl width="25px" height="20px" color="#898fd1" />, label: 'LTL' },
	fcl_cfs_service     : { icon: <IcMCfs width="25px" height="20px" color="#034afd" />, label: 'FCL CFS' },
};

export const SINGLE_LOCATIONS = [
	'fcl_customs_service',
	'lcl_customs_service',
	'air_customs_service',
	'fcl_cfs_service',
];

export const SERVICES_WITH_DETAILS = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];
