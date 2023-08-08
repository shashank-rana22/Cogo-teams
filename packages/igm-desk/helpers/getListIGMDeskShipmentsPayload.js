import tabSpecificPayload from './tabSpecificPayload.json';

export default function getListIGMDeskShipmentsPayload({
	filters = {},
	tabState = {},
	partner_id = '',
}) {
	const {
		page,
		q,
		sort_type = 'asc',
		sort_by = 'schedule_arrival',
		fileType,
		current_filter,
		trade_type,
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
			trade_type,
			...(q && { q }),
			[file_type] : true,
			partner_id,

			...(activeTab === 'daily_report' ? { date: true, [file_type]: undefined } : {}),
		},
		page,
		additional_methods: ['pagination', 'documents'],
		sort_by,
		sort_type,
	};

	return payload;
}
