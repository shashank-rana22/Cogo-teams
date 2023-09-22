const getOceanFormatterValues = ({ containers }) => {
	const LOCATION_ARR = [];
	(containers || []).forEach((item) => {
		const MARGINS_ARR = [];

		let LOCATION_ID = '';
		if (item?.container_no !== '') {
			item?.milestones.forEach((val) => {
				MARGINS_ARR.push({
					actual_date    : val.actual_date,
					event_date     : val.event_date,
					transport_mode : val.transport_mode,
					milestone      : val.milestone,
					vessel_name    : val.vessel_name,
					voyage_no      : val.voyage_no,
				});
				LOCATION_ID = val.location_id;
			});
		}
		LOCATION_ARR.push(
			{
				location_id : LOCATION_ID,
				milestones  : MARGINS_ARR,
			},
		);
	});

	return {
		containers: [
			{
				container_no : containers?.[0].container_no,
				locations    : LOCATION_ARR,
			},

		],
	};
};

export default getOceanFormatterValues;
