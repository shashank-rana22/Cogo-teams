import { isEmpty } from '@cogoport/utils';

const DEFAULT_FILTERS_COUNT = 0;
const COUNT_TO_BE_INCREASED_FILTERS_EMPTY = 0;
const COUNT_TO_BE_INCREASED_FILTERS_NOT_EMPTY = 1;

const getFiltersCount = ({ filters }) => Object.keys(filters || {}).reduce(
	(prev, filter) => (prev + (isEmpty(filters?.[filter])
		? COUNT_TO_BE_INCREASED_FILTERS_EMPTY : COUNT_TO_BE_INCREASED_FILTERS_NOT_EMPTY)),
	DEFAULT_FILTERS_COUNT,
);

export default getFiltersCount;
