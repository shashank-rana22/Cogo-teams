import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import STEPPER_CONFIG from '../config/SHIPMENT_STEPPER_TABS.json';

const getLocalStorageVal = () => {
	const storedValues = JSON.parse(localStorage?.getItem('kam_desk_values'));
	const kamDeskVersion = localStorage.getItem('kam_desk_version');

	const { filters = {}, scopeFilters = {}, activeTab } = storedValues || {};
	let { shipment_type, stepperTab } = storedValues || {};
	const { trade_type, page } = storedValues?.filters || {};

	if (!CONTROLS_CONFIG.shipment_types.some((shipment_type_obj) => shipment_type_obj.value === shipment_type)) {
		shipment_type = 'fcl_freight';
	}

	if (!stepperTab && shipment_type !== 'all') {
		stepperTab = STEPPER_CONFIG[shipment_type]?.[0]?.value;
	}

	if (trade_type && !CONTROLS_CONFIG.trade_types.some((trade_type_obj) => trade_type_obj.value === trade_type)) {
		filters.trade_type = '';
	}
	if (typeof page !== 'number') {
		filters.page = 1;
	}

	if (typeof page !== 'number') filters.page = 1;

	return {
		filters,
		shipment_type,
		scopeFilters,
		kamDeskVersion,
		activeTab,
		stepperTab,
	};
};

export default getLocalStorageVal;
