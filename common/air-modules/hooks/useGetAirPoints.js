import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, isSameDay } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const TRACKING_DATA_SORT_TRUE_VALUE = 1;
const TRACKING_DATA_SORT_FALSE_VALUE = -1;
const COMBINED_MILESTONES_SLICE_INDEX = -1;
const MAP_POINTS_LAST_INDEX_CALCULATOR = -1;
const MAP_POINTS_SLICE_INDEX = 0;
const MAP_POINTS_FIND_INDEX_NOT_FOUND_CHECKER = -1;

function useGetAirPoints({ airTrackerDetails = {} }) {
	const [selectedMilestonesList, setSelectedMilestonesList] = useState([]);
	const MAP_POINTS = [];

	if (airTrackerDetails?.air_flight_info?.length) {
		airTrackerDetails?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.tracking_data
			?.sort((a, b) => (a?.actual_date > b?.actual_date
				? TRACKING_DATA_SORT_TRUE_VALUE
				: TRACKING_DATA_SORT_FALSE_VALUE))
			.forEach((x, i) => {
				if (MAP_POINTS.findIndex((y) => y.station === x.station) > MAP_POINTS_FIND_INDEX_NOT_FOUND_CHECKER) {
					// already present
				} else {
					let info = (airTrackerDetails?.air_flight_info || []).find(
						(y) => y.depart_station === x.station,
					);
					let point = {};
					if (!isEmpty(info)) {
						point = {
							station        : info.depart_station,
							departure_lat  : info.departure_lat,
							departure_long : info.departure_long,
						};
					} else {
						info = (airTrackerDetails?.air_flight_info || []).find(
							(y) => y.arrival_station === x.station,
						);
						if (!isEmpty(info)) {
							point = {
								station        : info.arrival_station,
								departure_lat  : info.arrival_lat,
								departure_long : info.arrival_long,
							};
						}
					}
					if (
						i
						&& point
						&& MAP_POINTS[MAP_POINTS.length + MAP_POINTS_LAST_INDEX_CALCULATOR]?.departure_lat
					) {
						MAP_POINTS[MAP_POINTS.length + MAP_POINTS_LAST_INDEX_CALCULATOR]
							.arrival_lat = point.departure_lat;
						MAP_POINTS[MAP_POINTS.length + MAP_POINTS_LAST_INDEX_CALCULATOR]
							.arrival_long = point.departure_long;
					}
					if (point && point?.departure_lat) {
						MAP_POINTS.push(point);
					}
				}
			});
	}

	const GET_INDEX_IN_LIST = (key) => {
		let index = false;
		(airTrackerDetails?.data || []).forEach((e, i) => {
			if (e?.airway_bill_no === key) {
				index = i;
			}
		});
		return index;
	};

	const isPastOrPresentDay = (inputDate) => {
		const isCurrentDay = isSameDay(inputDate, new Date());
		if (isCurrentDay) return true;
		if (new Date() > new Date(inputDate)) return true;
		return false;
	};

	const processList = (list = []) => {
		const filteredList = list?.filter((item) => {
			if (
				isEmpty(item.station)
				|| isEmpty(item.actual_date)
				|| isEmpty(item.milestone)
			) {
				return false;
			}
			return true;
		});

		const ascSortedList = filteredList.sort(
			(a, b) => new Date(a.actual_date) - new Date(b.actual_date),
		);

		const ascUniqueStations = [
			...new Set((ascSortedList || [])?.map((item) => item?.station)),
		];

		const result = ascUniqueStations.map((station) => ascSortedList.filter((item) => item.station === station));

		return result;
	};

	useEffect(() => {
		const selectedIndex = GET_INDEX_IN_LIST(airTrackerDetails?.airway_bill_no);
		const processedMilestonesList = processList(
			airTrackerDetails?.data?.[selectedIndex]?.tracking_data ?? [],
		);
		setSelectedMilestonesList(processedMilestonesList);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [airTrackerDetails?.airway_bill_no]);

	useEffect(() => {
		let mostRecentPastOrPresentMilestoneId = null;
		selectedMilestonesList.map((combinedMilestones) => {
			const currentMilestone = combinedMilestones
				.slice(COMBINED_MILESTONES_SLICE_INDEX)[GLOBAL_CONSTANTS.zeroth_index];
			if (isPastOrPresentDay(currentMilestone?.actual_date)) {
				mostRecentPastOrPresentMilestoneId = currentMilestone?.id;
			}
			return false;
		});

		const anchorTarget = document.getElementById(
			mostRecentPastOrPresentMilestoneId,
		);
		anchorTarget?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
	}, [selectedMilestonesList]);

	return MAP_POINTS.slice(MAP_POINTS_SLICE_INDEX, MAP_POINTS.length + MAP_POINTS_LAST_INDEX_CALCULATOR);
}

export default useGetAirPoints;
