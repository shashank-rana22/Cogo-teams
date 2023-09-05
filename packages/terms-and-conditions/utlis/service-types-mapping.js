import {
	IcCFcl,
	IcCLcl,
	IcCAir,
	IcCFtl,
	IcCLtl,
	IcMTrailorFull,
	IcCHaulage,
	IcCFclLocals,
	IcCLclLocals,
	IcCAirLocals,
	IcCAirCustoms,
	IcCLclCustoms,
	IcCFclCustoms,
} from '@cogoport/icons-react';

const SERVICE_TYPES_MAPPING = {
	fcl_freight: {
		label        : 'FCL',
		value        : 'fcl_freight',
		color        : '#356EFD',
		svgComponent : <IcCFcl />,
	},
	lcl_freight: {
		label        : 'LCL',
		value        : 'lcl_freight',
		color        : '#66ACF7',
		svgComponent : <IcCLcl />,
	},
	air_freight: {
		label        : 'AIR',
		value        : 'air_freight',
		color        : '#EF9B9B',
		svgComponent : <IcCAir />,
	},
	ftl_freight: {
		label        : 'FTL',
		value        : 'ftl_freight',
		color        : '#81C0AF',
		svgComponent : <IcCFtl />,
	},
	ltl_freight: {
		label        : 'LTL',
		value        : 'ltl_freight',
		color        : '#81C0AF',
		svgComponent : <IcCLtl />,
	},
	trailer_freight: {
		label        : 'Trailer',
		value        : 'trailer_freight',
		color        : '#81C0AF',
		svgComponent : <IcMTrailorFull />,
	},
	haulage_freight: {
		label        : 'Haulage',
		value        : 'haulage_freight',
		color        : '#81C0AF',
		svgComponent : <IcCHaulage />,
	},
	rail_domestic_freight: {
		label        : 'Rails Domestic',
		value        : 'rail_domestic_freight',
		color        : '#81C0AF',
		svgComponent : <IcCHaulage />,
	},
	fcl_freight_local: {
		label        : 'Fcl Locals',
		value        : 'fcl_freight_local',
		color        : '#81C0AF',
		svgComponent : <IcCFclLocals />,
	},
	lcl_freight_local: {
		label        : 'Lcl Locals',
		value        : 'lcl_freight_local',
		color        : '#81C0AF',
		svgComponent : <IcCLclLocals />,
	},
	air_freight_local: {
		label        : 'Air Locals',
		value        : 'air_freight_local',
		color        : '#81C0AF',
		svgComponent : <IcCAirLocals />,
	},
	fcl_customs: {
		label        : 'Fcl Customs',
		value        : 'fcl_customs',
		color        : '#81C0AF',
		svgComponent : <IcCFclCustoms />,
	},
	lcl_customs: {
		label        : 'Lcl Customs',
		value        : 'lcl_customs',
		color        : '#81C0AF',
		svgComponent : <IcCLclCustoms />,
	},
	air_customs: {
		label        : 'Air Customs',
		value        : 'air_customs',
		color        : '#81C0AF',
		svgComponent : <IcCAirCustoms />,
	},
};

export default SERVICE_TYPES_MAPPING;
