import { isEmpty } from '@cogoport/utils';

import { isFutureDate } from './dateCompare';

const UNSHADED_MILESTONES = ['Station Crossed', 'Toll Plaza Crossed'];

const checkForMerging = (curr, next) => {
	if (
		UNSHADED_MILESTONES.includes(curr?.milestone)
        || UNSHADED_MILESTONES.includes(next?.milestone)
	) {
		return false;
	}

	if (isFutureDate(curr?.event_date) !== isFutureDate(next?.event_date)) {
		return false;
	}

	if (curr?.location !== next?.location) {
		return false;
	}

	return true;
};

const mergeOceanMilestone = (list = []) => {
	const result = [];

	const filteredList = (list || []).filter((item) => {
		const { location = '', event_date = '', milestone = '' } = item || {};

		if (!isEmpty(location) && !isEmpty(event_date) && !isEmpty(milestone)) {
			return true;
		}

		return false;
	});

	const sortedList = filteredList.sort(
		(curr, next) => new Date(curr.event_date) - new Date(next.event_date),
	);

	let currentEle = 0;
	while (currentEle < sortedList.length) {
		let nextEle = currentEle + 1;
		while (nextEle < sortedList.length && checkForMerging(sortedList[currentEle], sortedList[nextEle])) {
			nextEle += 1;
		}
		result.push(sortedList.slice(currentEle, nextEle));
		currentEle = nextEle;
	}
	return result;
};

const mergeAirMilestone = (list = []) => {
	const filteredList = list?.filter((item) => {
		const { station = '', actual_date = '', milestone = '' } = item || {};

		if (!isEmpty(station) && !isEmpty(actual_date) && !isEmpty(milestone)) {
			return true;
		}
		return false;
	});

	const sortedList = filteredList.sort(
		(curr, next) => new Date(curr.event_date) - new Date(next.event_date),
	);

	const uniqueStations = [...new Set(sortedList?.map((item) => item?.station))];

	const result = uniqueStations.map((station) => sortedList.filter((item) => item.station === station));

	return result;
};

export { mergeOceanMilestone, mergeAirMilestone };
