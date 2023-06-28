import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import TABS from '../config/TABS_CONFIG';

const TAB_NUMBER = 0;
export default function getLocalStorageVal() {
	const storedValues = JSON.parse(localStorage?.getItem('cost_booking_desk_values' || '{}'));
	const costBookingDeskVersion = localStorage.getItem('cost_booking_desk_version');

	const { scopeFilters = {}, filters = {} } = storedValues || {};

	let { shipmentType, stepperTab, activeTab } = storedValues || {};

	if (!CONTROLS_CONFIG.shipment_types.some((t) => t.value === shipmentType)) {
		shipmentType = 'fcl_freight';
		stepperTab = 'export';
		activeTab = 'assigned';
		filters.page = 1;
	}

	if (!Object.keys(TABS[shipmentType] || {})?.includes(stepperTab)) {
		stepperTab = Object.keys(TABS[shipmentType])?.[TAB_NUMBER] || '';
		const tabConfig = TABS[shipmentType]?.[stepperTab]?.[TAB_NUMBER];

		activeTab = tabConfig?.value || '';
		filters.criticalOn = filters.criticalOn && tabConfig?.isCriticalVisible;
	}

	if (typeof filters?.page !== 'number') filters.page = 1;

	return {
		filters, shipmentType, stepperTab, scopeFilters, costBookingDeskVersion, activeTab,
	};
}
