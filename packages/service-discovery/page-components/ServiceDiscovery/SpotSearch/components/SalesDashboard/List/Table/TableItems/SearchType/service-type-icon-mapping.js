import { IcMAir, IcMFcl, IcMLcl } from '@cogoport/icons-react';

const SERVICE_TYPE_ICON_MAPPING = {
	lcl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	fcl_freight: {
		icon  : IcMFcl,
		color : '#6892FE',
	},
	air_freight: {
		icon  : IcMAir,
		color : '#F9AE64',
	},
	trailer_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	ftl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	ltl_freight: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	fcl_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	lcl_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
	air_customs: {
		icon  : IcMLcl,
		color : '#7278AD',
	},
};

export default SERVICE_TYPE_ICON_MAPPING;
