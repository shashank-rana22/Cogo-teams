import { CYCLE_OPTIONS, CYCLE_TYPE, FREQUENCY_OPTIONS } from '../constants';

const filterControls = [
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
	{
		name        : 'frequency',
		placeholder : 'Frequency',
		type        : 'select',
		span        : 3,
		options     : FREQUENCY_OPTIONS,
		isClearable : true,
	},
];

export default filterControls;
