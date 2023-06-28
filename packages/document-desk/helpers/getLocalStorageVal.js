import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import FCL_CONFIGS from '../configs/FCL/CONTROLS_CONFIG.json';
import FCL_TABS from '../configs/FCL/TAB_CONFIG.json';
import LCL_CONFIGS from '../configs/LCL/CONTROLS_CONFIG.json';
import LCL_TABS from '../configs/LCL/TAB_CONFIG.json';
import SHIPMENT_TYPES_CONFIGS from '../configs/SHIPMENT_TYPES_CONFIGS.json';

const ResolveConfigs = {
	fcl_freight : FCL_CONFIGS,
	lcl_freight : LCL_CONFIGS,
};

const ResolveTabs = {
	fcl_freight : FCL_TABS,
	lcl_freight : LCL_TABS,
};

// make changes here for imports according to shipment type
const getLocalStorageVal = () => {
	const storedValues = JSON.parse(localStorage?.getItem('document_desk_values'));

	const { filters = {}, scopeFilters = {} } = storedValues || {};
	let { stepperTab, activeTab, shipment_type } = storedValues || {};

	if (typeof filters?.page !== 'number') {
		filters.page = 1;
	}

	if (!SHIPMENT_TYPES_CONFIGS?.some((shipment_type_obj) => shipment_type_obj.value === shipment_type)) {
		shipment_type = 'fcl_freight';
	}

	if (!ResolveConfigs[shipment_type].stepper_tabs.some((tab) => tab.value === stepperTab)) {
		stepperTab = 'export';
		activeTab = 'awaiting_service_provider_confirmation';
		filters.isCriticalOn = false;
	}

	const stepperConfig = ResolveTabs[shipment_type][stepperTab];

	if (!stepperConfig.some((tab) => tab.value === activeTab)) {
		const tabConfig = stepperConfig?.[GLOBAL_CONSTANTS.zeroth_index];
		activeTab = tabConfig?.value || '';
		filters.isCriticalOn = tabConfig?.isCriticalVisible && filters?.isCritical;
	}

	return { filters, activeTab, scopeFilters, stepperTab, shipment_type };
};

export default getLocalStorageVal;
