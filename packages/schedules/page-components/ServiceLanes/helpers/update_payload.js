const getPayload = ({ finalRoute, data, submit, form, frequency }) => {
	const waypoint_locations = finalRoute?.map((route, index) => {
		const { location_id, eta_day_count, etd_day_count } = route;
		if (index === form) {
			return { ...submit };
		}

		return { location_id, eta_day_count, etd_day_count };
	});

	const payload = {
		id               : data?.[0]?.id,
		trade_lane       : data?.[0]?.trade_lane,
		name             : data?.[0]?.name,
		shipping_line_id : data?.[0]?.shipping_line_id,
		waypoint_locations,
		status           : data?.[0]?.status,
		frequency        : frequency || undefined,
	};
	return payload;
};

export default getPayload;
