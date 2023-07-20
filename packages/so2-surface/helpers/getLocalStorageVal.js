import CONTROLS_CONFIG from '../configs/CONTROLS_CONFIG.json';
import tabContainer from '../configs/tabContainer';

const getLocalStorageVal = () => {
	const TABS_CONFIG = tabContainer();
	const storedValues = JSON.parse(localStorage?.getItem('document_desk_values'));
	const documentDeskVersion = localStorage.getItem('document_desk_version');

	const { filters = {}, scopeFilters = {} } = storedValues || {};
	let { stepperTab = '', activeTab = '' } = storedValues || {};

	if (typeof filters?.page !== 'number') filters.page = 1;

	if (!CONTROLS_CONFIG.stepper_tabs.some((tab) => tab.value === stepperTab)) {
		stepperTab = 'ftl_freight';
		activeTab = 'mandatory_docs_upload';
	}

	const stepperConfig = TABS_CONFIG[stepperTab];

	if (!stepperConfig.some((tab) => tab.value === activeTab)) {
		const [tabConfig] = stepperConfig || [];
		activeTab = tabConfig?.value || '';
	}

	return { filters, activeTab, scopeFilters, documentDeskVersion, stepperTab };
};

export default getLocalStorageVal;
