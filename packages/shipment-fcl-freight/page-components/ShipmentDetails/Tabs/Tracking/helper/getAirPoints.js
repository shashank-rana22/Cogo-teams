import { useState, useEffect } from 'react';
import { isEmpty, isSameDay } from '@cogoport/utils';

function getAirPoints({ airTrackerDetails = {} }) {
	const [selectedMilestonesList, setSelectedMilestonesList] = useState([]);
	const mapPoints = [];

	if (airTrackerDetails?.air_flight_info?.length > 0) {
		airTrackerDetails?.data?.[0]?.tracking_data
			?.sort((a, b) => (a?.actual_date > b?.actual_date ? 1 : -1))
			.forEach((x, i) => {
				if (mapPoints.findIndex((y) => y.station === x.station) > -1) {
					// already present
				} else {
					let info = (airTrackerDetails?.air_flight_info || []).find(
						(y) => y.depart_station === x.station,
					);
					let point = {};
					if (!isEmpty(info)) {
						point = {
							station: info.depart_station,
							departure_lat: info.departure_lat,
							departure_long: info.departure_long,
						};
					} else {
						info = (airTrackerDetails?.air_flight_info || []).find(
							(y) => y.arrival_station === x.station,
						);
						if (!isEmpty(info)) {
							point = {
								station: info.arrival_station,
								departure_lat: info.arrival_lat,
								departure_long: info.arrival_long,
							};
						}
					}
					if (
						i > 0 &&
						point &&
						mapPoints[mapPoints.length - 1]?.departure_lat
					) {
						mapPoints[mapPoints.length - 1].arrival_lat = point.departure_lat;
						mapPoints[mapPoints.length - 1].arrival_long = point.departure_long;
					}
					if (point && point?.departure_lat) {
						mapPoints.push(point);
					}
				}
			});
	}

	const getIndexInList = (key) => {
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

	useEffect(() => {
		const selectedIndex = getIndexInList(airTrackerDetails?.airway_bill_no);
		const processedMilestonesList = processList(
			airTrackerDetails?.data?.[selectedIndex]?.tracking_data ?? [],
		);
		setSelectedMilestonesList(processedMilestonesList);
	}, [airTrackerDetails?.airway_bill_no]);

	const processList = (list = []) => {
		const filteredList = list?.filter((item) => {
			if (
				isEmpty(item.station) ||
				isEmpty(item.actual_date) ||
				isEmpty(item.milestone)
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

		const result = ascUniqueStations.map((station) =>
			ascSortedList.filter((item) => item.station === station),
		);

		return result;
	};

	useEffect(() => {
		let mostRecentPastOrPresentMilestoneId = null;
		selectedMilestonesList.map((combinedMilestones) => {
			const currentMilestone = combinedMilestones.slice(-1)[0];
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

	return {
		airPoints: mapPoints.slice(0, mapPoints.length - 1),
		airLoading: selectedMilestonesList === 0,
	};
}

export default getAirPoints;
