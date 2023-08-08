import {
	IcMFair,
	IcMFlocalCharges,
	IcMFairport,
	IcMFcustoms,
} from '@cogoport/icons-react';

const SERVICE_ICON_MAPPINGS = {
	air_freight: {
		icon : <IcMFair />,
		text : 'AIR',
	},
	domestic_air_freight: {
		icon : <IcMFairport />,
		text : 'Domestic AIR',
	},
	air_freight_local: {
		icon : <IcMFlocalCharges />,
		text : 'AIR Local',
	},
	air_customs: {
		icon : <IcMFcustoms />,
		text : 'AIR Customs',
	},
};
export default SERVICE_ICON_MAPPINGS;
