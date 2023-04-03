import fclTabSpecificPayload from '../config/FCL/tabSpecificPayload.json';
import fclLocalTabSpecificPayload from '../config/FCL-Local/tabSpecificPayload.json';
import lclTabSpecificPayload from '../config/LCL/tabSpecificPayload.json';
import TABS_CONFIG from '../config/TABS_CONFIG.json';

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
	fcl_freight       : fclTabSpecificPayload,
	fcl_freight_local : fclLocalTabSpecificPayload,
	lcl_freight       : lclTabSpecificPayload,
};

const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export default function getPayload({ filters, activeTab, selected_agent_id }) {
	const { isCriticalOn, page, q, ...restFilters } = filters;
	const { shipment_type } = filters;

	const tabSpecificPayload = shipmentSpecificPayload[shipment_type];
	const tabs = TABS_CONFIG[shipment_type];

	const isCriticalVisible = tabs.find((tab) => tab.name === activeTab).isCriticalVisible ?? false;

	const threeDaysLater = new Date();
	threeDaysLater.setDate(threeDaysLater.getDate() + 3);
	threeDaysLater.setTime(threeDaysLater.getTime() - timezoneOffset);

	const payload = {
		filters: {
			state: shipmentStates[activeTab] || shipmentStates.in_progress,
			...tabSpecificPayload[activeTab],
			selected_agent_id,
			...(isCriticalVisible && isCriticalOn
				&& { schedule_departure_less_than: threeDaysLater }),
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
