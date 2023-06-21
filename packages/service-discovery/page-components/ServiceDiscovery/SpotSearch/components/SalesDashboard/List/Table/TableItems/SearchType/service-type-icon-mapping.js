import { IcMAir, IcMFcl, IcMLcl } from '@cogoport/icons-react';

const SERVICE_TYPE_ICON_MAPPING = {
	lcl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'LCL',
	},
	fcl_freight: {
		icon  : IcMFcl,
		color : '#6892FE',
		label : 'FCL',
	},
	air_freight: {
		icon  : IcMAir,
		color : '#F9AE64',
		label : 'AIR',
	},
	trailer_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'Trailer',
	},
	haulage_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'Rail',
	},
	ftl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'FTL',
	},
	ltl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'LTL',
	},
	fcl_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'FCL Customs',
	},
	lcl_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'LCL Customs',
	},
	air_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
		label : 'AIR Customs',
	},
};

export default SERVICE_TYPE_ICON_MAPPING;
