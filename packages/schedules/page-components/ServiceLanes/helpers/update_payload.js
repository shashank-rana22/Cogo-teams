import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getPayload = ({ finalRoute, data, submit, form, frequency }) => {
	const waypoint_locations = finalRoute?.map((route, index) => {
		const { location_id, eta_day_count, etd_day_count } = route;
		if (index === form) {
			return { ...submit };
		}

		return { location_id, eta_day_count, etd_day_count };
	});

	const payload = {
		id               : data?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
		trade_lane       : data?.[GLOBAL_CONSTANTS.zeroth_index]?.trade_lane,
		name             : data?.[GLOBAL_CONSTANTS.zeroth_index]?.name,
		shipping_line_id : data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
		waypoint_locations,
		status           : data?.[GLOBAL_CONSTANTS.zeroth_index]?.status,
		frequency        : frequency || undefined,
	};
	return payload;
};

export default getPayload;
