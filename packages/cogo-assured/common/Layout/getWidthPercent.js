const SINGLE_ROW_SPAN = 12;
const DEFAULT_SPAN = 6;
const PERCENT_FACTOR = 100;

const getWidthPercent = (span) => {
	let current_span = DEFAULT_SPAN;

	if (typeof span === 'number') current_span = span;

	const percent = (current_span / SINGLE_ROW_SPAN) * PERCENT_FACTOR;

	return percent;
};

export default getWidthPercent;
