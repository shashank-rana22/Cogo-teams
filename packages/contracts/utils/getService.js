import { IcMFairport, IcMFship, IcMLcl } from '@cogoport/icons-react';

const iconMapping = {
	fcl_freight : IcMFship,
	lcl_freight : IcMLcl,
	air_freight : IcMFairport,
};

const getService = ({ portPair }) => {
	const Element = iconMapping[portPair?.service_type] || IcMFship;

	return Element;
};

export default getService;
