import FCL_COMMON_TABS from '../config/FCL_COMMON_TABS';

const DEFAULT_PAGE_NUMBER = 1;

export default function getValidatedStoredValues() {
	const storedValues = JSON.parse(localStorage.getItem('igm_desk_stored_values'));

	let { page, q, fileType, sort_by, sort_type, trade_type, current_filter } = storedValues?.filters || {};

	const { scopeFilters = {} } = storedValues || {};

	let { activeTab } = storedValues?.tabState || {};

	const [defaultActiveTab] = FCL_COMMON_TABS;

	const { name: defaultTab } = (FCL_COMMON_TABS || []).find(
		(tab) => tab.name === activeTab,
	) || defaultActiveTab;

	activeTab = defaultTab;

	if (typeof page !== 'number') {
		page = DEFAULT_PAGE_NUMBER;
	}

	if (typeof q !== 'string') {
		q = '';
	}

	if (typeof trade_type !== 'string') {
		trade_type = 'import';
	}

	if (typeof sort_type !== 'string') {
		sort_type = 'asc';
	}

	if (typeof sort_by !== 'string') {
		sort_by = 'schedule_arrival';
	}

	if (typeof current_filter !== 'string') {
		current_filter = 'schedule_arrival';
	}

	if (typeof fileType !== 'boolean') {
		fileType = true;
	}

	return {
		filters: {
			...(q && { q }),
			page,
			fileType,
			trade_type,
			sort_by,
			sort_type,
			current_filter,
		},
		tabState: {
			activeTab,
		},
		scopeFilters,
	};
}
