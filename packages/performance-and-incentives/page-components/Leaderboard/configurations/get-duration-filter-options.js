import DURATION_CONSTANTS from '../../../constants/duration-constants';

const { TODAY, LAST_MONTH, THIS_MONTH, THIS_QUARTER, THIS_YEAR, CUSTOM } = DURATION_CONSTANTS;

const DURATION_OPTIONS = [
	{
		label : 'Today',
		value : TODAY,
	},
	{
		label : 'Last Month',
		value : LAST_MONTH,
	},
	{
		label : 'This Month',
		value : THIS_MONTH,
	},
	{
		label : 'This Quarter',
		value : THIS_QUARTER,
	},
	{
		label : 'This Year',
		value : THIS_YEAR,
	},
	{
		label : 'Custom',
		value : CUSTOM,
	},
];

export default DURATION_OPTIONS;
