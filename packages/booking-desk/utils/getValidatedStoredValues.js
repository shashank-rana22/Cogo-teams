import TABS_CONFIG from '../config/TABS_CONFIG';

const SHIPMENT_TYPES = Object.keys(TABS_CONFIG);

const DEFAULT_PAGE_NUMBER = 1;

export default function getValidatedStoredValues() {
	const storedValues = JSON.parse(localStorage.getItem('booking_desk_stored_values'));

	let { page, q, isCriticalOn } = storedValues?.filters || {};

	let { stepperTab, segmentedTab, activeTab } = storedValues?.tabState || {};

	if (!SHIPMENT_TYPES.includes(stepperTab)) {
		stepperTab = 'fcl_freight';
	}

	const segmentedTabs = Object.keys(TABS_CONFIG[stepperTab].segmented_tabs);

	if (!segmentedTabs.includes(segmentedTab)) {
		[segmentedTab] = segmentedTabs;
	}

	const { tabs } = TABS_CONFIG[stepperTab].segmented_tabs[segmentedTab];
	const [defaultActiveTab] = tabs;

	const { name: defaultTab, isCriticalVisible } = (tabs || []).find(
		(tab) => tab.name === activeTab,
	) || defaultActiveTab;

	activeTab = defaultTab;

	if (typeof page !== 'number') {
		page = DEFAULT_PAGE_NUMBER;
	}

	if (typeof q !== 'string') {
		q = '';
	}

	if (typeof isCriticalOn !== 'boolean') {
		isCriticalOn = false;
	}

	return {
		filters: {
			...(isCriticalVisible && { isCriticalOn: !!isCriticalOn }),
			...(q && { q }),
			page,
		},
		tabState: {
			stepperTab,
			segmentedTab,
			activeTab,
		},
		scopeFilters: storedValues?.scopeFilters || {},
	};
}
