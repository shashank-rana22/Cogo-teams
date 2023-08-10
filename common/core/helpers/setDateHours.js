const DEFAULT_VALUE_FOR_RADIX_PARAMETER = 10;
const START_INDEX_FOR_TIME_FORMAT = 0;
const END_INDEX_FOR_TIME_FORMAT = 4;
const DEFAULT_SIZE_FOR_TIME_FORMAT = 4;
const DEFAULT_VALUE_FOR_EACH_TIME_FORMAT_ELEMENT = 0;

const setDateHours = ({ time = '0:0:0:0', date }) => {
	const newDate = new Date(date);

	if (newDate.toDateString() === 'Invalid Date') {
		return null;
	}

	const timeSplitted = [...time.split(':'), ...Array(DEFAULT_SIZE_FOR_TIME_FORMAT)]
		.slice(START_INDEX_FOR_TIME_FORMAT, END_INDEX_FOR_TIME_FORMAT)
		.map((_) => parseInt(_ || DEFAULT_VALUE_FOR_EACH_TIME_FORMAT_ELEMENT, DEFAULT_VALUE_FOR_RADIX_PARAMETER));

	const isNaN = timeSplitted.some((_) => Number.isNaN(_));

	if (isNaN) return null;

	newDate.setHours(...timeSplitted);

	return newDate;
};

export default setDateHours;
