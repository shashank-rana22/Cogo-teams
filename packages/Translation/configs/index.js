import StatusComponent from '../page-components/StatusComponent';

const TABS_MAPPING = [
	{
		label     : 'Requested',
		value     : 'Requested',
		Component : StatusComponent,
	},
	{
		label     : 'Completed',
		value     : 'Completed',
		Component : StatusComponent,
	},
];

export default TABS_MAPPING;
