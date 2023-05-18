import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import STEPPER_CONFIG from '../config/SHIPMENT_STEPPER_TABS.json';
import ShipmentTabMapping from '../config/SHIPMENT_TAB_MAPPING';

const getLocalStorageVal = () => {
	const storedValues = JSON.parse(localStorage?.getItem('kam_desk_values'));
	const kamDeskVersion = localStorage.getItem('kam_desk_version');

	const { filters = {}, scopeFilters = {} } = storedValues || {};

	let { shipment_type, stepperTab, activeTab } = storedValues || {};

	const { page } = storedValues?.filters || {};

	if (!CONTROLS_CONFIG.shipment_types.some((shipment_type_obj) => shipment_type_obj.value === shipment_type)) {
		shipment_type = 'fcl_freight';
	}

	if (!stepperTab && shipment_type !== 'all') {
		stepperTab = STEPPER_CONFIG[shipment_type]?.[0]?.value;
	}

	if (!activeTab) {
		if (shipment_type === 'all') {
			activeTab = 'ongoing';
		} else {
			activeTab = ShipmentTabMapping?.[shipment_type]?.[stepperTab]?.tabs?.[0]?.value;
		}
	}

	if (typeof page !== 'number') {
		filters.page = 1;
	}

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
