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
	IcMFtrailorFull,
} from '@cogoport/icons-react';

export const iconMapping = {
	fcl_freight           : <IcMFship />,
	lcl_freight           : <IcMLcl />,
	air_freight           : <IcMFairport />,
	ftl_freight           : <IcMFftl />,
	ltl_freight           : <IcMFltl />,
	haulage_freight       : <IcMFhaulage />,
	fcl_customs           : <IcMCustoms />,
	lcl_customs           : <IcMFcustoms />,
	fcl_freight_local     : <IcMFlocalCharges />,
	rail_domestic_freight : (
		<IcMFtrailorFull />
	),
	lcl_freight_local: (
		<IcMLocalCharges />
	),
	air_freight_local: <IcMAir />,
};
