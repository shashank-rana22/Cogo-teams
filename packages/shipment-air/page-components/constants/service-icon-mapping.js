import {
	IcCFair,
	IcMFlocalCharges,
	IcMFairport,
	IcCFairCustoms,
} from '@cogoport/icons-react';

const SERVICE_ICON_MAPPINGS = {
	air_freight: {
		icon : <IcCFair />,
		text : 'AIR',
	},
	domestic_air_freight: {
		icon : <IcMFairport fill="#5936f0" />,
		text : 'Domestic AIR',
	},
	air_freight_local: {
		icon : <IcMFlocalCharges fill="#EF9B9B" />,
		text : 'AIR Local',
	},
	air_customs: {
		icon : <IcCFairCustoms />,
		text : 'AIR Customs',
	},
};
export default SERVICE_ICON_MAPPINGS;
