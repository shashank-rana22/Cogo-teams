const getFormatterValues = ({ locations }) => {
	const LOCATION_ARR = [];

	(locations || [])?.forEach((item) => {
		const MARGINS_ARR = [];
		if (item?.location_id !== '') {
			item?.milestones?.forEach((val) => {
				MARGINS_ARR.push({
					actual_date   : val?.actual_date,
					expected_date : val?.expected_date,
					flight_number : val?.flight_number,
					milestone     : val?.milestone,
					piece         : val?.piece,
					status        : val?.status,
				});
			});
		}
		LOCATION_ARR.push({ location_id: item?.location_id, milestones: MARGINS_ARR });
	});

	return {
		locations: LOCATION_ARR,
	};
};

export default getFormatterValues;
