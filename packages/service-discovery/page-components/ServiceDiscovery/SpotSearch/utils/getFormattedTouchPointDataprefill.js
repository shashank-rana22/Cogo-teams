const getFormattedTouchPointDataprefill = (data) => {
	const { touch_points = {} } = data || {};
	const { primary_service = {} } = touch_points || {};
	const { enroute = [] } = primary_service || {};
	const forwardJourney = enroute.filter(
		(element) => element.trip_type === 'one_way',
	);

	const forwardJourneyTouchPoints = forwardJourney.map((touchPoint) => ({
		id           : touchPoint.touch_point_location_id,
		name         : touchPoint.name,
		display_name : touchPoint.display_name,
	}));

	const returnJourney = enroute.filter(
		(element) => element.trip_type === 'round',
	);
	const returnJourneyTouchPoints = returnJourney.map((touchPoint) => ({
		id           : touchPoint.touch_point_location_id,
		name         : touchPoint.name,
		display_name : touchPoint.display_name,
	}));

	return {
		forwardJourneyTouchPoints,
		returnJourneyTouchPoints,
	};
};
export default getFormattedTouchPointDataprefill;
