const selectionCriteriaOptions = (serviceType = '') => {
	switch (serviceType) {
		case 'FCL_FREIGHT':
		case 'FCL_FREIGHT_LOCAL':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'containers_gated_in', value: 'containers_gated_in' },
				{ label: 'vessel_departed', value: 'vessel_departed' },
				{ label: 'vessel_arrived', value: 'vessel_arrived' },
				{ label: 'containers_gated_out', value: 'containers_gated_out' },
				{ label: 'completed', value: 'completed' },
			];

		case 'AIR_FREIGHT':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'cargo_handed_over_at_origin', value: 'cargo_handed_over_at_origin' },
				{ label: 'flight_departed', value: 'flight_departed' },
				{ label: 'flight_arrived', value: 'flight_arrived' },
				{ label: 'cargo_handed_over_at_destination', value: 'cargo_handed_over_at_destination' },
				{ label: 'completed', value: 'completed' },
			];

		case 'HAULAGE_FREIGHT':
		case 'RAIL_DOMESTIC_FREIGHT':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'container_departed', value: 'container_departed' },
				{ label: 'container_arrived', value: 'container_arrived' },
				{ label: 'completed', value: 'completed' },
			];

		case 'LCL_FREIGHT':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'cargo_carted_in', value: 'cargo_carted_in' },
				{ label: 'cargo_stuffed', value: 'cargo_stuffed' },
				{ label: 'vessel_departed', value: 'vessel_departed' },
				{ label: 'vessel_arrived', value: 'vessel_arrived' },
				{ label: 'cargo_handed_over', value: 'cargo_handed_over' },
				{ label: 'completed', value: 'completed' },
			];

		case 'FTL_FREIGHT':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'cargo_picked_up', value: 'cargo_picked_up' },
				{ label: 'cargo_dropped', value: 'cargo_dropped' },
				{ label: 'completed', value: 'completed' },
			];

		case 'FCL_CUSTOMS':
		case 'AIR_CUSTOMS':
		case 'LCL_CUSTOMS':
			return [
				{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
				{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
				{ label: 'custom_cleared', value: 'custom_cleared' },
				{ label: 'completed', value: 'completed' },
			];

		default: return [];
	}
};
export default selectionCriteriaOptions;
