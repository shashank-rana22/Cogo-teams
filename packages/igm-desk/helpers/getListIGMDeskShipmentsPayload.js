import tabSpecificPayload from './tabSpecificPayload.json';

export default function getListIGMDeskShipmentsPayload({
	filters = {},
	tabState = {},
	user,
}) {
	const {
		page,
		q,
		sort_type = 'asc',
		sort_by = 'schedule_arrival',
		fileType,
		current_filter,
		...restFilters
	} = filters;
	const { activeTab } = tabState;

	const updatedTabSpecificPayload = tabSpecificPayload[activeTab] || {};
	const file_type = fileType ? 'pre_alert' : 'draft';

	const payload = {
		filters: {
			state       : activeTab,
			...updatedTabSpecificPayload,
			...restFilters,
			trade_type  : 'import',
			...(q && { q }),
			[file_type] : true,
			partner_id  : user,
			...(activeTab === 'daily_report' && { date: true }),
		},
		page,
		additional_methods: ['pagination', 'documents'],
		sort_by,
		sort_type,
	};

	return payload;
}
