// import { lcl_freight as tabs } from '../../../config/TABS_CONFIG.json';
import tabSpecificPayload from '../configs/tabSpecificPayload.json';

const shipmentStates = {
	in_progress: [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	],
	cancelled: ['cancelled'],
};
shipmentStates.completed = [...shipmentStates.in_progress, 'completed'];

// export default function getPayload({ filters, activeTab, selected_agent_id }){
export default function getPayload({ filters, activeTab }) {
	const { isCriticalOn, page, ...restFilters } = filters;
	// const isCriticalVisible = tabs.find((tab) => tab.name === activeTab).criticalVisible ?? false;

	const payload = {
		filters: {
			state: shipmentStates[activeTab] || shipmentStates.in_progress,
			...tabSpecificPayload[activeTab],
			// selected_agent_id,
			// ...(isCriticalOn && isCriticalVisible && {})
			...restFilters,
		},
		page,
		additional_methods : ['pagination'],
		sort_by            : 'created_at',
		sort_type          : 'desc',

	};

	return payload;
}
