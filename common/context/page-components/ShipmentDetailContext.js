import { createContext } from 'react';

const ShipmentDetailContext = createContext({
	shipment_data : { shipment_type: null, service_type: null, id: '' },
	servicesList  : {},
});

export default ShipmentDetailContext;
