import { isEmpty } from '@cogoport/utils';

const INCREMENT_BY_ONE = 1;

const getFormattedTouchPointDataPayload = (data = {}) => {
	const { touchPoints = {}, haltTime = {}, location = {} } = data || {};
	const { halt_time_unit, halt_time_value } = haltTime || {};
	const { one_way:oneWayTouchPoints = [], round:roundTouchPoints = [] } = touchPoints || {};

	const NEW_TOUCH_POINTS = [];

	(oneWayTouchPoints || []).forEach((touchPoint) => {
		const item = { ...touchPoint };
		NEW_TOUCH_POINTS.push({ ...item });
	});

	let sequence = 0;

	const ftl_freight_service_touch_points_attribute = [
		{
			touch_point_location_id : location.origin?.id,
			touch_point_type        : 'origin',
			sequence_number         : sequence + INCREMENT_BY_ONE,
		},
	];

	NEW_TOUCH_POINTS.forEach((touchPoint) => {
		sequence += INCREMENT_BY_ONE;
		ftl_freight_service_touch_points_attribute.push({
			touch_point_location_id : touchPoint?.id,
			touch_point_type        : 'enroute',
			trip_type               : 'one_way',
			sequence_number         : sequence,
		});
	});

	if (!isEmpty(roundTouchPoints)) {
		roundTouchPoints.forEach((touchPoint) => {
			sequence += INCREMENT_BY_ONE;
			ftl_freight_service_touch_points_attribute.push({
				touch_point_location_id : touchPoint?.id,
				touch_point_type        : 'enroute',
				trip_type               : 'round',
				sequence_number         : sequence,
			});
		});
	}

	ftl_freight_service_touch_points_attribute.push({
		touch_point_location_id : location.destination?.id,
		touch_point_type        : 'destination',
		halt_time_value         : halt_time_value || undefined,
		halt_time_unit          : halt_time_unit || undefined,
		sequence_number         : sequence + INCREMENT_BY_ONE,
	});

	return ftl_freight_service_touch_points_attribute;
};

export default getFormattedTouchPointDataPayload;
