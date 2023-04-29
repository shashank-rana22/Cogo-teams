import TABS_CONFIG from '../config/TABS_CONFIG.json';
import FCL from '../config/tabSpecificPayload/FCL.json';
import FCL_Local from '../config/tabSpecificPayload/FCL_LOCAL.json';
import LCL from '../config/tabSpecificPayload/LCL.json';

const shipmentStates = {
	in_progress: [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	],
	cancelled: ['cancelled'],
};
shipmentStates.completed = [...shipmentStates.in_progress, 'completed'];

const shipmentSpecificPayload = {
	fcl_freight       : FCL,
	fcl_freight_local : FCL_Local,
	lcl_freight       : LCL,
};

const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export default function getListBookingDeskShipmentsPayload({
	filters = {},
	activeTab = '',
	selected_agent_id = '',
}) {
	const { isCriticalOn, page, q, shipment_type, ...restFilters } = filters;

	const tabSpecificPayload = shipmentSpecificPayload[shipment_type][activeTab];
	const otherFilters = tabSpecificPayload.other || {};
	const combinedTradeTypeSpecific = { task_attributes: [] };

	let payloadKey = [];
	if (filters.trade_type) {
		payloadKey.push(filters.trade_type, 'common');
	} else {
		payloadKey = ['import', 'common'];
	}

	payloadKey.forEach((key) => {
		if (key in tabSpecificPayload) {
			combinedTradeTypeSpecific.task_attributes = [
				...combinedTradeTypeSpecific.task_attributes,
				...(tabSpecificPayload[key]?.task_attributes || {}),
			];
		}
	});

	const tabs = TABS_CONFIG[shipment_type];

	const isCriticalVisible = tabs.find((tab) => tab.name === activeTab).isCriticalVisible || false;

	const threeDaysLater = new Date();
	threeDaysLater.setDate(threeDaysLater.getDate() + 3);
	threeDaysLater.setTime(threeDaysLater.getTime() - timezoneOffset);

	const oneDayLater = new Date();
	oneDayLater.setDate(oneDayLater.getDate() + 1);
	oneDayLater.setHours(23, 59, 59, 999);

	const criticalPayload = activeTab === 'container_pick_up'
		? { bn_expiry_less_than: oneDayLater }
		: { schedule_departure_less_than: threeDaysLater };

	const payload = {
		filters: {
			state: shipmentStates[activeTab] || shipmentStates.in_progress,
			...(combinedTradeTypeSpecific || {}),
			...(otherFilters || {}),
			...(selected_agent_id && { stakeholder_id: selected_agent_id }),
			...(isCriticalVisible
				&& isCriticalOn
				? criticalPayload : {}),
			...(q && { q }),
			...restFilters,
		},
		page,
		additional_methods : ['pagination'],
		sort_by            : 'created_at',
		sort_type          : 'desc',
	};

	return payload;
}
