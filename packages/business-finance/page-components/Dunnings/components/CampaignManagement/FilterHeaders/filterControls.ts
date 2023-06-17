import { CYCLE_OPTIONS, CYCLE_TYPE, SERVICE_OPTIONS } from '../constants';

const filterControls = [
	{
		name        : 'service',
		placeholder : 'Service',
		type        : 'select',
		span        : 3,
		options     : SERVICE_OPTIONS,
		isClearable : true,
	},
	{
		name        : 'cycleStatus',
		placeholder : 'Cycle Status',
		type        : 'select',
		span        : 3,
		options     : CYCLE_OPTIONS,
		isClearable : true,
	},
	{
		name        : 'dunningCycleType',
		placeholder : 'Cycle Type',
		type        : 'select',
		span        : 3,
		options     : CYCLE_TYPE,
		isClearable : true,
	},
];

export default filterControls;
