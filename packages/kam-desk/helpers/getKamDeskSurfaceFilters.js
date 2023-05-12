import { isEmpty } from '@cogoport/utils';

import tabPayload from '../config/SHIPMENTS_PAYLOAD';

const getKamDeskSurfaceFilters = ({ filters = {}, kamDeskContextValues = {} }) => {
	const { activeTab, stepperTab, shipmentType } = kamDeskContextValues || {};
	const tab_payload = tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];

	let finalFilters = { ...filters, ...tab_payload };

	if (!isEmpty(filters?.tags)) {
		finalFilters = { ...finalFilters, tags: [filters?.tags] };
	}

	return { filters: finalFilters, shipment_type: stepperTab };
};

export default getKamDeskSurfaceFilters;
