const selectionCriteriaOptions = (serviceType = '') => {
	const criteriaOptions = {
		FCL_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'containers_gated_in', value: 'containers_gated_in' },
			{ label: 'vessel_departed', value: 'vessel_departed' },
			{ label: 'vessel_arrived', value: 'vessel_arrived' },
			{ label: 'containers_gated_out', value: 'containers_gated_out' },
			{ label: 'completed', value: 'completed' }],

		FCL_FREIGHT_LOCAL: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'containers_gated_in', value: 'containers_gated_in' },
			{ label: 'vessel_departed', value: 'vessel_departed' },
			{ label: 'vessel_arrived', value: 'vessel_arrived' },
			{ label: 'containers_gated_out', value: 'containers_gated_out' },
			{ label: 'completed', value: 'completed' }],

		AIR_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'cargo_handed_over_at_origin', value: 'cargo_handed_over_at_origin' },
			{ label: 'flight_departed', value: 'flight_departed' },
			{ label: 'flight_arrived', value: 'flight_arrived' },
			{ label: 'cargo_handed_over_at_destination', value: 'cargo_handed_over_at_destination' },
			{ label: 'completed', value: 'completed' },
		],

		HAULAGE_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'container_departed', value: 'container_departed' },
			{ label: 'container_arrived', value: 'container_arrived' },
			{ label: 'completed', value: 'completed' },
		],

		RAIL_DOMESTIC_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'container_departed', value: 'container_departed' },
			{ label: 'container_arrived', value: 'container_arrived' },
			{ label: 'completed', value: 'completed' },
		],

		LCL_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'cargo_carted_in', value: 'cargo_carted_in' },
			{ label: 'cargo_stuffed', value: 'cargo_stuffed' },
			{ label: 'vessel_departed', value: 'vessel_departed' },
			{ label: 'vessel_arrived', value: 'vessel_arrived' },
			{ label: 'cargo_handed_over', value: 'cargo_handed_over' },
			{ label: 'completed', value: 'completed' },
		],

		FTL_FREIGHT: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'cargo_picked_up', value: 'cargo_picked_up' },
			{ label: 'cargo_dropped', value: 'cargo_dropped' },
			{ label: 'completed', value: 'completed' },
		],

		FCL_CUSTOMS: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'custom_cleared', value: 'custom_cleared' },
			{ label: 'completed', value: 'completed' },
		],

		AIR_CUSTOMS: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'custom_cleared', value: 'custom_cleared' },
			{ label: 'completed', value: 'completed' },
		],

		LCL_CUSTOMS: [
			{ label: 'awaiting_service_provider_confirmation', value: 'awaiting_service_provider_confirmation' },
			{ label: 'confirmed_by_service_provider', value: 'confirmed_by_service_provider' },
			{ label: 'custom_cleared', value: 'custom_cleared' },
			{ label: 'completed', value: 'completed' },
		],

	};

	return criteriaOptions[serviceType];
};
export default selectionCriteriaOptions;
