import {
	IcMFair,
	IcMFlocalCharges,
	IcMFairport,
	IcMFcustoms,
} from '@cogoport/icons-react';

const serviceIconMappings = (t = () => {}) => ({
	air_freight: {
		icon : <IcMFair />,
		text : t('airBookingDesk:service_air'),
	},
	domestic_air_freight: {
		icon : <IcMFairport />,
		text : t('airBookingDesk:service_domestic_air'),
	},
	air_freight_local: {
		icon : <IcMFlocalCharges />,
		text : t('airBookingDesk:service_air_local'),
	},
	air_customs: {
		icon : <IcMFcustoms />,
		text : t('airBookingDesk:service_air_customs'),
	},
});

export default serviceIconMappings;
