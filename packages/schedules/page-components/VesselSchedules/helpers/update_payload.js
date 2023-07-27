const getPayload = ({ finalRoute, data, submit, form }) => {
	const waypoint_locations = finalRoute?.map((route, index) => {
		const { location_id, eta, etd } = route;
		if (index === form) {
			return { ...submit };
		}
		return { location_id, eta, etd };
	});

	const payload = {
		id               : data?.id,
		vessel_id        : data?.vessel?.id,
		shipping_line_id : data?.operator?.id,
		service_lane_id  : data?.service_lane_id,
		status           : data?.status,
		waypoint_locations,
		route            : data?.route,

	};

	return payload;
};

export default getPayload;
