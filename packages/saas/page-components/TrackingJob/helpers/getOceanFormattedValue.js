const getOceanFormatterValues = ({ containers }) => {
	const CONTAINER_ARR = [];
	const LOCATION_ARR = [];
	(containers || [])?.forEach((item) => {
		const MARGINS_ARR = [];
		item?.containers?.locations?.forEach((location) => {
			let locationId = '';
			location?.milestones?.forEach((val) => {
				MARGINS_ARR.push({
					actual_date    : val?.actual_date,
					event_date     : val?.event_date,
					transport_mode : val?.transport_mode,
					milestone      : val?.milestone,
					vessel_name    : val?.vessel_name,
					voyage_no      : val?.voyage_no,
				});
			});
			locationId = location?.location_id;
			LOCATION_ARR.push(
				{
					location_id : locationId,
					milestones  : MARGINS_ARR,
				},
			);
		});
		CONTAINER_ARR.push({
			container_no : item?.container_no,
			locations    : LOCATION_ARR,
		});
	});
	return {
		containers: CONTAINER_ARR,
	};
};

export default getOceanFormatterValues;
