import DURATION_CONSTANTS from '../../../constants/duration-constants';
import {
	getThisAseessYearStartDate, getLastMonthStartAndEndDates, getThisMonthStartDate,
	getThisQuarterStartDate, getTodayStartDate,
	getLastQuarterStartAndEndDates,
} from '../../../utils/start-date-functions';

const { TODAY, LAST_MONTH, THIS_MONTH, LAST_QUARTER, THIS_QUARTER, THIS_YEAR } = DURATION_CONSTANTS;

const GET_START_DATE_FUNCTION_MAPPING = {
	[TODAY]        : getTodayStartDate,
	[LAST_MONTH]   : getLastMonthStartAndEndDates,
	[THIS_MONTH]   : getThisMonthStartDate,
	[LAST_QUARTER] : getLastQuarterStartAndEndDates,
	[THIS_QUARTER] : getThisQuarterStartDate,
	[THIS_YEAR]    : getThisAseessYearStartDate,
};

const previousEntries = [LAST_MONTH, LAST_QUARTER];

const onChangeDuration = (props) => {
	const { selectedDuration, setDateRange = () => {}, setDuration = () => {} } = props;

	if (typeof GET_START_DATE_FUNCTION_MAPPING[selectedDuration] === 'function') {
		if (previousEntries.includes(selectedDuration)) {
			const { startDate, endDate } = GET_START_DATE_FUNCTION_MAPPING[selectedDuration]();

			setDateRange({ startDate, endDate });
		} else {
			setDateRange({
				startDate : GET_START_DATE_FUNCTION_MAPPING[selectedDuration](),
				endDate   : new Date(),
			});
		}
	}

	setDuration(selectedDuration);
};

export default onChangeDuration;
