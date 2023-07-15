import tabSpecificPayload from './tabSpecificPayload.json';

export default function getListIGMDeskShipmentsPayload({
	filters = {},
	tabState = {},
}) {
	const { page, q, sort_type = 'asc', sort_by = 'selected_schedule_arrival', fileType, ...restFilters } = filters;
	const { activeTab } = tabState;

	const updatedTabSpecificPayload = tabSpecificPayload[activeTab] || {};
	const file_type = fileType ? 'pre_alrert' : 'draft';

	const payload = {
		filters: {
			state       : activeTab,
			...updatedTabSpecificPayload,
			...restFilters,
			trade_type  : 'import',
			...(q && { q }),
			[file_type] : true,
		},
		page,
		additional_methods: ['pagination'],
		sort_by,
		sort_type,
	};

	return payload;
}
