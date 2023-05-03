import tabMapping from './tabMapping';

export default function getPayload({ activeTab, filters }) {
	const { page, ...restFilters } = filters || {};
	const tabFilter = tabMapping();
	const tabPayload = tabFilter[activeTab];

	const payload = {
		filters: {
			...tabPayload,
			...restFilters,
		},
		additional_methods : ['pagination'],
		page,
		sort_by            : 'created_at',
		sort_type          : 'desc',
	};

	return payload;
}
