import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getFormatedEventsData = ({ data = {} }) => {
	const { list = [] } = data || {};

	const GROUPPED_DATA = {};

	(list || []).forEach((item) => {
		const key = `${item.schedule_start.split('T')[GLOBAL_CONSTANTS.zeroth_index]}-${item
			.schedule_end.split('T')[GLOBAL_CONSTANTS.zeroth_index]}`;

		if (!GROUPPED_DATA[key]) {
			GROUPPED_DATA[key] = {
				start      : new Date(item.schedule_start),
				end        : new Date(item.schedule_end),
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
