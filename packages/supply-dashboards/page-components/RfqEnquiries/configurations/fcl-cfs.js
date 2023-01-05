import chargeControls from './charge-controls';

const fclCfsControls = [
	{
		name       : 'service_provider_id',
		label      : 'Service Provider',
		span       : 4,
		type       : 'select',
		placeolder : 'select service provider',

	},
	{
		label       : 'Rate Provided by user',
		name        : 'sourced_by_id',
		placeholder : 'Select',
		type        : 'select',
		isClearable : true,
		span        : 4,
	},
	chargeControls({ heading: '' }),
];

export default fclCfsControls;
