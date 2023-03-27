import fclTabSpecificPayload from '../config/FCL/tabSpecificPayload.json';
import fclLocalTabSpecificPayload from '../config/FCL-Local/tabSpecificPayload.json';
import lclTabSpecificPayload from '../config/LCL/tabSpecificPayload.json';
// import TABS_CONFIG from '../config/TABS_CONFIG.json';

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

// export default function getPayload({ filters, activeTab, selected_agent_id }){
export default function getPayload({ filters, activeTab }) {
	const { isCriticalOn, page, ...restFilters } = filters;
	const { shipment_type } = filters;

	const tabSpecificPayload = shipmentSpecificPayload[shipment_type];
	// const tabs = TABS_CONFIG[shipment_type];

	// const isCriticalVisible = tabs.find((tab) => tab.name === activeTab).criticalVisible ?? false;

	const payload = {
		filters: {
			state: shipmentStates[activeTab] || shipmentStates.in_progress,
			...tabSpecificPayload[activeTab],
			// selected_agent_id,
			// ...(isCriticalOn && isCriticalVisible && {}),
			...restFilters,
		},
		page,
		additional_methods : ['pagination'],
		sort_by            : 'created_at',
		sort_type          : 'desc',

	};

	return payload;
}
