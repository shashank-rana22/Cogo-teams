import { isEmpty } from '@cogoport/utils';

const getCreateObjectivePayload = (props) => {
	const { data, weightageData, distribute_equally } = props;

	const { generalConfiguration, objectiveRequirements } = data || {};

	const {
		objective_type,
		name,
		partner,
		channels,
		roles,
		lifecycle_stage,
		// selectMode,
		// user_ids,
	} = generalConfiguration || {};

	const {
		service_requirement_operator,
		service_requirements,
		organization_details,
		stats_details,
	} = objectiveRequirements || {};

	const { countries, states, cities, pincodes, segments } = organization_details || {};

	const getUserObjectiveWeightage = () => {
		const USER_OBJECTIVE_WEIGHTAGE_MAPPING = {};

		Object.entries(weightageData).forEach(([controlName, weightage]) => {
			const [objectiveId, userId, roleId] = controlName.split('_');

			USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId] = {
				...(USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId] || {}),
				user_id                   : userId,
				role_id                   : roleId,
				user_objective_weightages : {
					...(USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId].user_objective_weightages || {}),
					[objectiveId]: {
						objective_id : objectiveId || undefined,
						weightage,
						action       : isEmpty(objectiveId) ? 'create' : 'update',
					},
				},
			};
		});

		return Object.values(USER_OBJECTIVE_WEIGHTAGE_MAPPING).map((item) => ({
			...item,
			user_objective_weightages: Object.values(item.user_objective_weightages),
		}));
	};

	const payload = {
		objective_type,
		name,
		partner_id       : partner?.id,
		channels,
		role_ids         : roles?.map((role) => role.id),
		lifecycle_stages : lifecycle_stage,
		service_requirement_operator,
		service_details  : service_requirements?.map((service) => ({
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
		distribute_equally,
		objective_weightages: getUserObjectiveWeightage(),
	};

	return payload;
};

export default getCreateObjectivePayload;
