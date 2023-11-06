import { IcMFairport, IcMFship, IcMLcl, IcMFLocalCharges } from '@cogoport/icons-react';

const iconMapping = {
	fcl_freight       : IcMFship,
	lcl_freight       : IcMLcl,
	air_freight       : IcMFairport,
	fcl_freight_local : IcMFLocalCharges,
	lcl_freight_local : IcMFLocalCharges,
};

const getService = ({ portPair }) => {
	const Element = iconMapping[portPair?.service_type] || IcMFship;

	return Element;
};

export default getService;
