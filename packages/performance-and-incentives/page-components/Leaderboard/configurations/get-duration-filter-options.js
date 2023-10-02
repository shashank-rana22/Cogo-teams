import DURATION_CONSTANTS from '../../../constants/duration-constants';
import getCurrentYear from '../../../utils/get-current-year';
import getMonthDetails from '../../../utils/get-month-details';
import { getCurrentQuarter, getLastQuarter } from '../../../utils/get-quarter-details';

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
		label : `Last Month (${lastMonth})`,
		value : LAST_MONTH,
	},
	{
		label : `This Month (${currMonth})`,
		value : THIS_MONTH,
	},
	{
		label : `Last Quarter (${lastQuarterStartMonth}-${lastQuarterEndMonth})`,
		value : LAST_QUARTER,
	},
	{
		label : `This Quarter (${quarterStartMonth}-${quarterEndMonth})`,
		value : THIS_QUARTER,
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
