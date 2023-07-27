const formatObjectiveDataForCard = ({ objectiveData }) => {
	const {
		stats_details: statsDetails,
		organization_details: organizationDetails,
		service_details: setviceDetails,
		service_requirement_operator,
	} = objectiveData || {};

	const { start_date, end_date, quotation_count, search_count, shipment_count } = statsDetails || {};

	const { country, state, city, pincode, segments } = organizationDetails || {};

	const formattedData = {
		...objectiveData,
		service_requirement_operator,
		stats_details: {
			date_range: {
				startDate : start_date,
				endDate   : end_date,
			},
			quotation_count,
			search_count,
			shipment_count,
		},
		organization_details: {
			country, state, city, pincode, segments,
		},
		service_requirements: setviceDetails,
	};

	return formattedData;
};

export default formatObjectiveDataForCard;
