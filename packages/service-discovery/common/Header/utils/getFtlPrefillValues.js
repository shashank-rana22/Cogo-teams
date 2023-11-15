import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getFormattedTouchPointDataprefill from './getFormattedTouchPointDataprefill';

const getFtlPrefillValues = (data = {}, touch_points = {}) => {
	const { trip_type:typeOfJourney = '' } = data || {};

	const { primary_service:{ destination = {} } = {} } = touch_points || {};

	const haltData = destination?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		forwardJourneyTouchPoints = [],
		returnJourneyTouchPoints = [],
	} = getFormattedTouchPointDataprefill(touch_points);

	return {
		typeOfJourney,
		touchPoints: {
			one_way : forwardJourneyTouchPoints,
			round   : returnJourneyTouchPoints,
		},
		haltTime: {
			halt_time_value : haltData.halt_time_value,
			halt_time_unit  : haltData.halt_time_unit,
		},
	};
};
export default getFtlPrefillValues;
