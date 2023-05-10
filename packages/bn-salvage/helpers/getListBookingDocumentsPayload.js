import TABS from '../config/tabs.json';

export default function getListBookingDeskShipmentsPayload({ filters, activeTab }) {
	const { filters: defaultFilters } = TABS.find((tab) => tab.name === activeTab) || {};

	const payload = {
		filters: {
			...defaultFilters,
		},
		page               : filters.page,
		additional_methods : ['pagination'],
		sort_by            : 'created_at',
		sort_type          : 'desc',
	};

	return payload;
}
