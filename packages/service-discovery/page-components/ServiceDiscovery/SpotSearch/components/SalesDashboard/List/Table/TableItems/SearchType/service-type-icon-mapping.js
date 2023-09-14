import {
	IcMAir,
	IcMCustoms,
	IcMFcl,
	IcMFtl,
	IcMHaulage,
	IcMLcl,
	IcMLtl,
	IcMTrailorFull,
	IcMCfs,
	IcMLocalCharges,
} from '@cogoport/icons-react';

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
		icon  : IcMTrailorFull,
		color : '#FCDC00',
		label : 'Trailer',
	},
	haulage_freight: {
		icon  : IcMHaulage,
		color : '#F37166',
		label : 'Rail',
	},
	ftl_freight: {
		icon  : IcMFtl,
		color : '#ABCD62',
		label : 'FTL',
	},
	ltl_freight: {
		icon  : IcMLtl,
		color : '#88CAD1',
		label : 'LTL',
	},
	fcl_customs: {
		icon  : IcMCustoms,
		color : '#6892FE',
		label : 'FCL Customs',
	},
	fcl_cfs: {
		icon  : IcMCfs,
		color : '#6892FE',
		label : 'FCL CFS',
	},
	lcl_customs: {
		icon  : IcMCustoms,
		color : '#7278AD',
		label : 'LCL Customs',
	},
	air_customs: {
		icon  : IcMCustoms,
		color : '#F9AE64',
		label : 'AIR Customs',
	},
	fcl_freight_local: {
		icon  : IcMLocalCharges,
		color : '#6892FE',
		label : 'FCL Locals',
	},
	lcl_freight_local: {
		icon  : IcMLocalCharges,
		color : '#7278AD',
		label : 'LCL Locals',
	},
	air_freight_local: {
		icon  : IcMLocalCharges,
		color : '#F9AE64',
		label : 'AIR Locals',
	},
};

export default SERVICE_TYPE_ICON_MAPPING;
