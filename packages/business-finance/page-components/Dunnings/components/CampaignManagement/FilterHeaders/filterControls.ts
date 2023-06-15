import { CYCLE_OPTIONS, SERVICE_OPTIONS } from '../constants';

const filterControls = [
	{
		name        : 'service',
		placeholder : 'Service',
		type        : 'select',
		span        : 5,
		options     : SERVICE_OPTIONS,
	},
	{
		name        : 'cycleStatus',
		placeholder : 'Cycle Status',
		type        : 'select',
		span        : 5,
		options     : CYCLE_OPTIONS,

	},
];

export default filterControls;
