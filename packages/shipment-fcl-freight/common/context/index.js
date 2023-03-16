import { createContext } from 'react';

export const ShipmentDetailContext = createContext({
	shipment_data: {
		shipment_type : null,
		service_type  : null,
	},
	servicesList: {},
});
