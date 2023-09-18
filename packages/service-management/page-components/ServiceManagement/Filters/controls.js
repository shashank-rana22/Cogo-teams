import { serviceOptions } from './serviceOptions';

const controls = [
	{
		name        : 'organization_id',
		placeholder : 'Select organization',
		size        : 'sm',
		label       : 'Organization',
		type        : 'async_select',
		span        : 12,
		asyncKey    : 'organizations',
		params      : { filters: { status: 'active' }, account_type: 'service_provider' },
	},
	{
		size        : 'sm',
		placeholder : 'Select service',
		name        : 'service',
		label       : 'Service',
		type        : 'select',
		span        : 12,
		options     : serviceOptions,
	},

];

export default controls;
