import StatusComponent from '../page-components/StatusComponent/index';

const TABS_MAPPING = [
	{
		label     : 'PENDING',
		value     : 'pending',
		Component : StatusComponent,
	},
	{
		label     : 'COMPLETED',
		value     : 'completed',
		Component : StatusComponent,
	},
];

export default TABS_MAPPING;
