import {
	IcMFship,
	IcMFairport,
	IcMLcl,
	IcMFftl,
	IcMFltl,
	IcMFhaulage,
	IcMCustoms,
	IcMFlocalCharges,
	IcMLocalCharges,
	IcMAir,
	IcMFcustoms,
	IcMCfs,
	IcMFtrailorFull,
	IcMTrailorFull,
	IcADomesticAir,
	IcCAirCustoms,
	IcCFcl,
	IcCLcl,
	IcCAir,
	IcCFtl,
	IcCLtl,
	IcCHaulage,
	IcCFclCustoms,
	IcCFlclCustoms,
	IcCFclLocals,
	IcCLclLocals,
	IcCAirLocals,
	IcATruck,
	IcAShipAmber,
} from '@cogoport/icons-react';

export const ICONS_MAPPING = {
	fcl_freight           : IcMFship,
	lcl_freight           : IcMLcl,
	air_freight           : IcMFairport,
	ftl_freight           : IcMFftl,
	ltl_freight           : IcMFltl,
	haulage_freight       : IcMFhaulage,
	fcl_customs           : IcMCustoms,
	lcl_customs           : IcMFcustoms,
	fcl_freight_local     : IcMFlocalCharges,
	rail_domestic_freight : IcMFtrailorFull,
	lcl_freight_local     : IcMLocalCharges,
	air_freight_local     : IcMAir,
	fcl_cfs               : IcMCfs,
	air_customs           : IcCAirCustoms,
	domestic_air_freight  : IcADomesticAir,
	trailer_freight       : IcMTrailorFull,
	default               : IcAShipAmber,
};

export const COLORED_ICONS_MAPPING = {
	fcl_freight           : IcCFcl,
	lcl_freight           : IcCLcl,
	air_freight           : IcCAir,
	ftl_freight           : IcCFtl,
	ltl_freight           : IcCLtl,
	haulage_freight       : IcCHaulage,
	fcl_customs           : IcCFclCustoms,
	lcl_customs           : IcCFlclCustoms,
	air_customs           : IcCAirCustoms,
	fcl_freight_local     : IcCFclLocals,
	lcl_freight_local     : IcCLclLocals,
	air_freight_local     : IcCAirLocals,
	rail_domestic_freight : IcCHaulage,
	fcl_cfs               : IcMCfs,
	domestic_air_freight  : IcADomesticAir,
	trailer_freight       : IcATruck,
	default               : IcAShipAmber,
};

export const SINGLE_LOCATIONS = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'origin_fcl_customs',
	'destination_fcl_customs',
	'origin_lcl_customs',
	'destination_lcl_customs',
	'origin_air_customs',
	'destination_air_customs',
	'fcl_cfs',
	'fcl_freight_local',
	'air_freight_local',
	'lcl_freight_local',
	'ltl_freight',
];

export const ROUTES_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

export const TRADE_TYPE_MAPPING = {
	import : 'Origin',
	export : 'Destination',
};

export const QUERY_PATH = {
	missing_id : 'trade-enquiry',
	dislike_id : 'disliked-rates',
	sid        : undefined,
};

export const ID_TYPE_OPTIONS = ['missing_id', 'dislike_id'];
