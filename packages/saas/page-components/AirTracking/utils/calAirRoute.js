import { isEmpty } from '@cogoport/utils';

const createBezier = (inputPoints, step) => {
	let t = 0;
	const bezierPoints = [];
	while (t <= 1) {
		try {
			let x1;
			let x2;
			let x3;
			x1 = parseFloat(inputPoints[0].lat);
			x3 = parseFloat(inputPoints[1].lat);
			x2 = Math.max(x1, x3) + 20;
			const lat_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

			x1 = parseFloat(inputPoints[0].lng);
			x3 = parseFloat(inputPoints[1].lng);
			x2 = (x1 + x3) / 2;
			const lng_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

			bezierPoints.push({
				lat : lat_x,
				lng : lng_x,
			});
		} catch (err) {
			t = 1;
		}
		t += step;
	}
	return bezierPoints;
};
const getRoute = (latLngArr) => {
	let routeArr = [];

	latLngArr.forEach((pt) => {
		const { arrival_lat = 0, arrival_long = 0, departure_lat = 0, departure_long = 0 } = pt;

		const ptArr = [arrival_lat, arrival_long, departure_lat, departure_long];

		const isValidPtArr = ptArr.every((point) => point);

		if (isValidPtArr) {
			const source = {
				lat : departure_lat || 0,
				lng : departure_long || 0,
			};
			const dest = {
				lat : arrival_lat || 0,
				lng : arrival_long || 0,
			};

			const route = createBezier([source, dest], 0.001);
			routeArr = [...routeArr, ...route];
		}
	});
	return routeArr;
};

const calAirRoute = ({ list = [] }) => {
	const allAirRoute = [];

	list.forEach((airDetails) => {
		const mapPoints = [];
		const { airway_bill_no = '', air_flight_info = [], data: milestoneData = [] } = airDetails || {};

		if (!isEmpty(air_flight_info)) {
			const sortedData = milestoneData.sort((a, b) => (a?.actual_date > b?.actual_date ? 1 : -1));

			sortedData.forEach((data, index) => {
				const isDataPresent = mapPoints.findIndex((pt) => pt?.station === data?.station) > -1;

				if (!isDataPresent) {
					let point = {};
					const lastDataIndex = mapPoints.length - 1;
					let info = (air_flight_info || []).find((ele) => ele?.depart_station === data?.station);

					if (info) {
						point = {
							station        : info?.depart_station,
							departure_lat  : info?.departure_lat,
							departure_long : info?.departure_long,
						};
					} else {
						info = (air_flight_info || []).find((ele) => ele.arrival_station === data.station);
						if (info) {
							point = {
								station        : info?.arrival_station,
								departure_lat  : info?.arrival_lat,
								departure_long : info?.arrival_long,
							};
						}
					}

					if (index > 0 && !isEmpty(point) && mapPoints[lastDataIndex]?.departure_lat) {
						mapPoints[lastDataIndex].arrival_lat = point?.departure_lat;
						mapPoints[lastDataIndex].arrival_long = point?.departure_long;
					}

					if (point && point?.departure_lat) {
						mapPoints.push(point);
					}
				}
			});
			const route = getRoute(mapPoints.slice(0, mapPoints.length - 1));
			allAirRoute.push({ route, airWayNo: airway_bill_no });
		}
	});
	return allAirRoute;
};

export default calAirRoute;
