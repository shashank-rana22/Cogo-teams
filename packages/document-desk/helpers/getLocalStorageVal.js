import CONTROLS_CONFIG from '../configs/CONTROLS_CONFIG.json';
import TABS_CONFIG from '../configs/TAB_CONFIG.json';

const getLocalStorageVal = () => {
	const storedValues = JSON.parse(localStorage?.getItem('document_desk_values'));
	const documentDeskVersion = localStorage.getItem('document_desk_version');

	const { filters = {}, scopeFilters = {} } = storedValues || {};
	let { stepperTab = '', activeTab = '' } = storedValues || {};

	if (typeof filters?.page !== 'number') filters.page = 1;

	if (!CONTROLS_CONFIG.stepper_tabs.some((tab) => tab.value === stepperTab)) {
		stepperTab = 'export';
		activeTab = 'awaiting_service_provider_confirmation';
		filters.isCriticalOn = false;
	}

	const stepperConfig = TABS_CONFIG[stepperTab];

	if (!stepperConfig.some((tab) => tab.value === activeTab)) {
		const tabConfig = stepperConfig?.[0];
		activeTab = tabConfig?.value || '';
		filters.isCriticalOn = tabConfig?.isCriticalVisible && filters?.isCritical;
	}

	return { filters, activeTab, scopeFilters, documentDeskVersion, stepperTab };
};

export default getLocalStorageVal;
