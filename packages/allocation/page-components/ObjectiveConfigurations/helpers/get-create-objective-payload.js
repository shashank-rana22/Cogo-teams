import { isEmpty } from '@cogoport/utils';

import SELECT_AGENTS_KEYS_MAPPING from '../constants/select-agents-keys-mapping';

const { SELECT_ONLY, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

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
		selectMode,
		user_ids,
	} = generalConfiguration || {};

	const {
		service_requirement_operator,
		service_requirements,
		organization_details,
		stats_details,
	} = objectiveRequirements || {};

	const { country, state, city, pincode, segments } = organization_details || {};

	const { date_range = {}, ...restStatsDetails } = stats_details || {};

	const getUserObjectiveWeightage = () => {
		const USER_OBJECTIVE_WEIGHTAGE_MAPPING = {};

		Object.entries(weightageData).forEach(([controlName, weightage]) => {
			const [objectiveId, userId, roleId] = controlName.split('_');

			if (isEmpty(weightage)) {
				throw new Error('Weightage for all objective not set. Please resolve all conflicts first.');
			}

			if (userId === 'undefined') {
				return;
			}

			USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId] = {
				...(USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId] || {}),
				user_id                   : userId,
				role_id                   : roleId,
				user_objective_weightages : {
					...(USER_OBJECTIVE_WEIGHTAGE_MAPPING[userId]?.user_objective_weightages || {}),
					[objectiveId]: {
						objective_id : objectiveId === 'undefined' ? undefined : objectiveId,
						weightage,
						action       : objectiveId === 'undefined' ? 'create' : 'update',
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
		lifecycle_stages : !isEmpty(lifecycle_stage) ? [lifecycle_stage] : undefined,
		user_ids         : selectMode === SELECT_ONLY ? user_ids : undefined,
		except_user_ids  : selectMode === EXCLUDE_ONLY ? user_ids : undefined,
		service_requirement_operator,
		service_details  : service_requirements?.map((service) => ({
			...service,
			origin_location_id      : service?.origin_location?.id,
			destination_location_id : service?.destination_location?.id,
			origin_location         : undefined,
			destination_location    : undefined,
		})),
		organization_details: {
			country_ids : country?.map((item) => item.id),
			state_ids   : state?.map((item) => item.id),
			city_ids    : city?.map((item) => item.id),
			pincode_ids : pincode?.map((item) => item.id),
			segments,
		},
		stats_details: {
			start_date : date_range.startDate,
			end_date   : date_range.endDate,
			...restStatsDetails,
		},
		distribute_equally,
		objective_weightages: getUserObjectiveWeightage(),
	};

	return payload;
};

export default getCreateObjectivePayload;
