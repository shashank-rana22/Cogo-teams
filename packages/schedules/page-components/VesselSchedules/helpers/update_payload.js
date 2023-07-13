const getPayload = ({ finalRoute, data }) => {
	const waypoint_locations = finalRoute?.map((route) => {
		const { location_id, eta, etd } = route;
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
