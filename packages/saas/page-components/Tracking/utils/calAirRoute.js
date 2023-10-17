import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const ONE = 1;
const TWO = 2;
const STEP_SIZE = 0.001;
const MINUS_ONE = -1;
const TWENTY = 20;

const createBezier = (inputPoints, step) => {
	let t = 0;
	const BEZIER_POINTS = [];
	while (t <= ONE) {
		try {
			let x1;
			let x2;
			let x3;
			x1 = parseFloat(inputPoints[GLOBAL_CONSTANTS.zeroth_index].lat);
			x3 = parseFloat(inputPoints[ONE].lat);
			x2 = Math.max(x1, x3) + TWENTY;
			const lat_x = (ONE - t) * ((ONE - t) * x1 + t * x2) + t * ((ONE - t) * x2 + t * x3);

			x1 = parseFloat(inputPoints[GLOBAL_CONSTANTS.zeroth_index].lng);
			x3 = parseFloat(inputPoints[ONE].lng);
			x2 = (x1 + x3) / TWO;
			const lng_x = (ONE - t) * ((ONE - t) * x1 + t * x2) + t * ((ONE - t) * x2 + t * x3);

			BEZIER_POINTS.push({
				lat : lat_x,
				lng : lng_x,
			});
		} catch (err) {
			t = ONE;
		}
		t += step;
	}
	return BEZIER_POINTS;
};
const getRoute = (latLngArr) => {
	let routeArr = [];

	latLngArr.forEach((pt) => {
		const { arrival_lat = 0, arrival_long = 0, departure_lat = 0, departure_long = 0 } = pt;

		const ptArr = [arrival_lat, arrival_long, departure_lat, departure_long];

		const isValidPtArr = ptArr.every((point) => point);

		if (isValidPtArr) {
			const source = {
				lat : departure_lat || GLOBAL_CONSTANTS.zeroth_index,
				lng : departure_long || GLOBAL_CONSTANTS.zeroth_index,
			};
			const dest = {
				lat : arrival_lat || GLOBAL_CONSTANTS.zeroth_index,
				lng : arrival_long || GLOBAL_CONSTANTS.zeroth_index,
			};

			const route = createBezier([source, dest], STEP_SIZE);
			routeArr = [...routeArr, ...route];
		}
	});
	return routeArr;
};

const calAirRoute = ({ list = [] }) => {
	const ALL_AIR_ROUTE = [];

	list.forEach((airDetails) => {
		const MAP_POINTS = [];
		const { airway_bill_no = '', air_flight_info = [], data: milestoneData = [] } = airDetails || {};

		if (!isEmpty(air_flight_info)) {
			const sortedData = milestoneData.sort((a, b) => (a?.actual_date > b?.actual_date ? ONE : MINUS_ONE));

			sortedData.forEach((data, index) => {
				const isDataPresent = MAP_POINTS.findIndex((pt) => pt?.station === data?.station) > MINUS_ONE;

				if (!isDataPresent) {
					let point = {};
					const lastDataIndex = MAP_POINTS.length - ONE;
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

					if (index > GLOBAL_CONSTANTS.zeroth_index
						&& !isEmpty(point)
						&& MAP_POINTS[lastDataIndex]?.departure_lat) {
						MAP_POINTS[lastDataIndex].arrival_lat = point?.departure_lat;
						MAP_POINTS[lastDataIndex].arrival_long = point?.departure_long;
					}

					if (point && point?.departure_lat) {
						MAP_POINTS.push(point);
					}
				}
			});
			const route = getRoute(MAP_POINTS.slice(GLOBAL_CONSTANTS.zeroth_index, MAP_POINTS.length - ONE));
			ALL_AIR_ROUTE.push({ route, airWayNo: airway_bill_no });
		}
	});
	return ALL_AIR_ROUTE;
};

export default calAirRoute;
