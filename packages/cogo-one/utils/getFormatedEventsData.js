const getFormatedEventsData = ({ data = {} }) => {
	const { list = [] } = data || {};

	const formatedList = (list || []).map((item) => ({
		...item,
		start : new Date(item.schedule_start),
		end   : new Date(item?.schedule_end),
	}));

	const GROUPPED_DATA = {};

	(formatedList || []).forEach((item) => {
		const key = `${item.start.getDate() - item.start.getMonth()}-${item.start.getDate() - item.start.getMonth()}`;

		if (!GROUPPED_DATA[key]) {
			GROUPPED_DATA[key] = {
				start      : new Date(item.schedule_start),
				end        : new Date(item.schedule_start),
				eventsList : [item.calendar],
			};
		} else {
			GROUPPED_DATA[key].eventsList.push(item.calendar);
		}
	});

	const formatedEventsList = Object.values(GROUPPED_DATA || {});

	return formatedEventsList;
};

export default getFormatedEventsData;
