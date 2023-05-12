import { isEmpty } from '@cogoport/utils';

import tabPayload from '../config/SHIPMENTS_PAYLOAD';

const getShipmentFilters = ({ filters = {}, kamDeskContextValues = {} }) => {
	const { activeTab, stepperTab, shipmentType } = kamDeskContextValues || {};

	const tab_payload = shipmentType === 'all'
		? tabPayload.all?.[activeTab] : tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];

	let finalFilters = { ...filters, ...tab_payload };

	if (!isEmpty(filters?.tags)) {
		finalFilters = { ...finalFilters, tags: [filters?.tags] };
	}

	if (shipmentType !== 'all') {
		finalFilters.shipment_type = stepperTab;
	}

	return { filters: finalFilters };
};

export default getShipmentFilters;
