const getCreateObjectivePayload = ({ data }) => {
	const { generalConfiguration, objectiveRequirements } = data;

	const {
		type: objective_type,
		name,
		partner,
		channels,
		roles,
		lifecycle_stage,
		selectMode,
		user_ids,
	} = generalConfiguration || {};

	const {
		service_requirement_operator,
		service_requirements,
		organization_details,
		stats_details,
	} = objectiveRequirements || {};

	const { countries, states, cities, pincodes, segments } = organization_details || {};

	const payload = {
		objective_type,
		name,
		partner_id        : partner?.id,
		channels,
		role_ids          : roles?.map((role) => role.id),
		lifecycle_stages  : lifecycle_stage,
		users_select_type : selectMode,
		user_ids          : selectMode === 'custom' ? user_ids : undefined,
		service_requirement_operator,
		service_details   : service_requirements?.map((service) => ({
			...service,
			origin_id      : service?.origin_location?.id,
			destination_id : service?.destination_location?.id,
		})),
		organization_details: {
			country_ids : countries?.map((country) => country.id),
			state_ids   : states?.map((country) => country.id),
			city_ids    : cities?.map((country) => country.id),
			pincode_ids : pincodes?.map((country) => country.id),
			segments,
		},
		stats_details,
	};

	return payload;
};

export default getCreateObjectivePayload;
