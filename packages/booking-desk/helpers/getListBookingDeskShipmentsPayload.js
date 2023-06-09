import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';
import TABS_CONFIG from '../config/TABS_CONFIG';
import FCL_CFS from '../config/tabSpecificPayload/FCL_CFS.json';
import FCL_EXPORT from '../config/tabSpecificPayload/FCL_EXPORT.json';
import FCL_IMPORT from '../config/tabSpecificPayload/FCL_IMPORT.json';
import FCL_LOCAL from '../config/tabSpecificPayload/FCL_LOCAL.json';
import LCL_EXPORT from '../config/tabSpecificPayload/LCL_EXPORT.json';
import LCL_IMPORT from '../config/tabSpecificPayload/LCL_IMPORT.json';

const timezoneOffset = new Date().getTimezoneOffset() * NUMERICAL_VALUES.sixty * NUMERICAL_VALUES.thousand;

const getPayloadDate = (daysLater = '') => {
	const daysLaterDate = new Date();

	daysLaterDate.setDate(daysLaterDate.getDate() + NUMERICAL_VALUES[daysLater]);
	daysLaterDate.setTime(daysLaterDate.getTime() - timezoneOffset);
	daysLaterDate.setHours(
		NUMERICAL_VALUES.twenty_three,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.fifty_nine,
		NUMERICAL_VALUES.tripple_nine,
	);

	return daysLaterDate;
};

const SHIPMENT_STATES = {
	in_progress: [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	],
	cancelled: ['cancelled'],
};

const TRADE_TYPES = ['import', 'export'];

SHIPMENT_STATES.completed = [...SHIPMENT_STATES.in_progress, 'completed'];

const SHIPMENT_SPECIFIC_PAYLOAD = {
	fcl_freight_export : FCL_EXPORT,
	fcl_freight_import : FCL_IMPORT,
	fcl_freight_local  : FCL_LOCAL,
	fcl_freight_cfs    : FCL_CFS,
	lcl_freight_export : LCL_EXPORT,
	lcl_freight_import : LCL_IMPORT,
};

export default function getListBookingDeskShipmentsPayload({
	filters = {},
	tabState = {},
	selected_agent_id = '',
}) {
	const { isCriticalOn, page, q, ...restFilters } = filters;
	const { stepperTab, segmentedTab, activeTab } = tabState;

	const { tabs } = TABS_CONFIG[stepperTab].segmented_tabs[segmentedTab] || {};

	const isCriticalVisible = tabs.find((tab) => tab.name === activeTab).isCriticalVisible || false;

	const tabSpecificPayload = (SHIPMENT_SPECIFIC_PAYLOAD[`${stepperTab}_${segmentedTab}`] || {})[activeTab] || {};

	const threeDaysLater = getPayloadDate('three');
	const oneDayLater = getPayloadDate('one');

	const criticalPayload = activeTab === 'container_pick_up'
		? { bn_expiry_less_than: oneDayLater }
		: { schedule_departure_less_than: threeDaysLater };

	const payload = {
		filters: {
			...restFilters,
			state: SHIPMENT_STATES[activeTab] || SHIPMENT_STATES.in_progress,
			...tabSpecificPayload,
			...(selected_agent_id && { stakeholder_id: selected_agent_id }),
			...(isCriticalVisible && isCriticalOn ? criticalPayload : {}),
			...(q && { q }),
			...(TRADE_TYPES.includes(segmentedTab) && { trade_type: segmentedTab }),
		},
		page,
		additional_methods : ['pagination'],
		sort_by            : 'created_at',
		sort_type          : 'desc',
	};

	return payload;
}
