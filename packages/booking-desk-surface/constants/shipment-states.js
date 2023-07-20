const SHIPMENT_STATES = [
	{
		label : 'Awaiting Service Provider Confirmation',
		value : 'awaiting_service_provider_confirmation',
	},
	{
		label : 'Confirmed by Service Provider',
		value : 'confirmed_by_service_provider',
	},
	{
		label : 'Cargo Picked Up',
		value : 'cargo_picked_up',
	},
	{
		label : 'Cargo dropped',
		value : 'cargo_dropped',
	},
	{
		label : 'Completed',
		value : 'completed',
	},
	{
		label : 'Aborted',
		value : 'aborted',
	},
	{
		label : 'Cancelled',
		value : 'cancelled',
	},
];

export default SHIPMENT_STATES;
