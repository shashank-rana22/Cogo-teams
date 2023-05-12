import tabPayload from '../config/SHIPMENTS_PAYLOAD';

const getKamDeskSurfaceFilters = ({ filters = {}, kamDeskContextValues = {} }) => {
	const { activeTab, stepperTab, shipmentType } = kamDeskContextValues || {};
	const tab_payload = tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];

	const finalFilters = { ...filters, ...tab_payload };

	return { filters: finalFilters, shipment_type: stepperTab };
};

export default getKamDeskSurfaceFilters;
