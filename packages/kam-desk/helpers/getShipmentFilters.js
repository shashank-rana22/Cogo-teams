import tabPayload from '../config/SHIPMENTS_PAYLOAD';

const getShipmentFilters = ({ filters = {}, kamDeskContextValues = {} }) => {
	const { activeTab, stepperTab, shipmentType } = kamDeskContextValues || {};

	const tab_payload = shipmentType === 'all'
		? tabPayload.all?.[activeTab] : tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];

	const finalFilters = { ...filters, ...tab_payload };

	if (shipmentType !== 'all') {
		finalFilters.shipment_type = stepperTab;
	}

	return { filters: finalFilters };
};

export default getShipmentFilters;
