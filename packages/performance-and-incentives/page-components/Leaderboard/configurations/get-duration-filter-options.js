import DURATION_CONSTANTS from '../../../constants/duration-constants';
import { getCurrentQuarter, getCurrentYear, getLastQuarter, getMonthDetails } from '../helpers/getDurationTImeDetails';

const { TODAY, LAST_MONTH, THIS_MONTH, LAST_QUARTER, THIS_QUARTER, THIS_YEAR, CUSTOM } = DURATION_CONSTANTS;

const { currMonth, lastMonth } = getMonthDetails();
const { currentYear } = getCurrentYear();
const { quarterStartMonth, quarterEndMonth } = getCurrentQuarter();
const { lastQuarterStartMonth, lastQuarterEndMonth } = getLastQuarter();

const DURATION_OPTIONS = [
	{
		label : 'Today',
		value : TODAY,
	},
	{
		label : `This Month (${currMonth})`,
		value : THIS_MONTH,
	},
	{
		label : `Last Month (${lastMonth})`,
		value : LAST_MONTH,
	},
	{
		label : `This Quarter (${quarterStartMonth}-${quarterEndMonth})`,
		value : THIS_QUARTER,
	},
	{
		label : `Last Quarter (${lastQuarterStartMonth}-${lastQuarterEndMonth})`,
		value : LAST_QUARTER,
	},
	{
		label : `This Year (${currentYear})`,
		value : THIS_YEAR,
	},
	{
		label : 'Custom',
		value : CUSTOM,
	},
];

export default DURATION_OPTIONS;
