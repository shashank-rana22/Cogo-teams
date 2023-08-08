import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import TABS from '../config/TABS_CONFIG';

export default function getLocalStorageVal() {
	const storedValues = JSON.parse(localStorage?.getItem('cost_booking_desk_values' || '{}'));

	const { scopeFilters = {}, filters = {} } = storedValues || {};

	let { shipmentType, stepperTab, activeTab } = storedValues || {};

	if (!CONTROLS_CONFIG.shipment_types.some((t) => t.value === shipmentType)) {
		shipmentType = 'fcl_freight';
		stepperTab = 'export';
		activeTab = 'assigned';
		filters.page = 1;
	}

	if (!Object.keys(TABS[shipmentType] || {})?.includes(stepperTab)) {
		stepperTab = Object.keys(TABS[shipmentType])?.[GLOBAL_CONSTANTS.zeroth_index] || '';
		const tabConfig = TABS[shipmentType]?.[stepperTab]?.[GLOBAL_CONSTANTS.zeroth_index];

		activeTab = tabConfig?.value || '';
		filters.criticalOn = filters.criticalOn && tabConfig?.isCriticalVisible;
	}

	if (typeof filters?.page !== 'number') filters.page = 1;

	return {
		filters, shipmentType, stepperTab, scopeFilters, activeTab,
	};
}
