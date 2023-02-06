import StatusComponent from '../page-components/StatusComponent';

const TABS_MAPPING = [
	{
		label     : 'Pending',
		value     : 'pending',
		Component : StatusComponent,
	},
	{
		label     : 'Completed',
		value     : 'completed',
		Component : StatusComponent,
	},
];

export default TABS_MAPPING;
