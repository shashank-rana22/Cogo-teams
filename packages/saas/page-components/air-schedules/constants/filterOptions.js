const getFilterOptions = () => {
	const SORT_FILTERS = {
		arrival      : ['Arrival'],
		departure    : ['Departure'],
		transit_time : [
			'Transit Time',
		],
	};

	return SORT_FILTERS;
};

export default getFilterOptions;
