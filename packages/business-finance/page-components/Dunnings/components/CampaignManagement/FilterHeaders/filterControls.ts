import { CYCLE_OPTIONS, CYCLE_TYPE } from '../constants';

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
];

export default filterControls;
