const getPayload = ({ finalRoute, data }) => {
	const waypoint_locations = finalRoute?.map((route) => {
		const { location_id } = route;
		return { location_id };
	});

	const payload = {
		id               : data?.id,
		trade_lane       : data?.trade_lane,
		name             : data?.name,
		shipping_line_id : data?.shipping_line_id,
		waypoint_locations,
		frequency        : null,
		interval         : null,
		day_of_week      : null,
		week_of_month    : null,
		month_of_year    : null,
		status           : data?.status,
	};

	return payload;
};

export default getPayload;
